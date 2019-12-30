const fs = require("fs");
const path = require("path");
const activityDatabase = require('../mysqlConfig');

let activity = {
  get: async function (ctx) {
    const file = await activityDatabase.findActivityById(ctx.request.query['id']);

    if (file.length) {
      ctx.body = {
        message: "获取成功", status: true, activity: file[0]
      };
    } else {
      ctx.body = { message: "无数据", status: false, activity: [] };
    }
  },
  getAll: async function (ctx) {
    const file = await activityDatabase.getAllActivity();

    if (file.length) {
      ctx.body = {
        message: "获取成功", status: true, activity: file
      };
    } else {
      ctx.body = { message: "无数据", status: false, activity: [] };
    }
  },
  set: async function (ctx) {
    let id = ctx.request.body['id'];
    let json = ctx.request.body['activity_json']

    const activity = await activityDatabase.findActivity(id)
    if (activity.length !== 0) {
      await activityDatabase.updateActivity(id, json)
        .then((data) => {
          let r = '';
          if (data.affectedRows != 0) {
            r = 'ok';
          }
          ctx.body = { message: "更新成功", status: true };
        }).catch((err) => {
          ctx.body = { ...err, status: false };
        })
      return;
    }
    await activityDatabase.addActivity(id, json)
      .then((data) => {
        let r = '';
        if (data.affectedRows != 0) {
          r = 'ok';
        }
        ctx.body = { message: "上传成功", status: true };
      }).catch((err) => {
        ctx.body = { ...err, status: false };
      })
  },
  deleteById: async function (ctx) {
    let id = ctx.request.body['id'];
    await activityDatabase.deleteActivity(id)
      .then((data) => {
        let r = '';
        if (data.affectedRows != 0) {
          r = 'ok';
        }
        ctx.body = { message: "删除成功", status: true };
      }).catch((err) => {
        ctx.body = { ...err, status: false };
      })
  }
}

module.exports = activity
