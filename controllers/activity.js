const fs = require("fs");
const path = require("path");
const activityDatabase = require('../mysqlConfig');

let activity = {
  get: async function (ctx) {
    const file = await activityDatabase.findActivityById(ctx.request.body['id']);

    if (file.length) {
      ctx.body = {
        message: "获取成功", status: "true", activity: file[0]
      };
    } else {
      ctx.body = { message: "无数据", status: "false", activity: [] };
    }
  },
  set: async function (ctx) {
    let id = ctx.request.body['id'];
    let json = ctx.request.body['activity_json']
    await activityDatabase.addActivity({id,json})
      .then((data) => {
        let r = '';
        if (data.affectedRows != 0) {
          r = 'ok';
        }
        ctx.body = {
          data: r
        }
      }).catch(() => {
        ctx.body = {
          data: 'err'
        }
      })
  }
}

module.exports = activity
