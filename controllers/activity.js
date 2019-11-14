const fs = require("fs");
const path = require("path");
const activity = require('../controllers/mysqlConfig');

let activity = {
  get: async function (ctx) {
    ctx.body = await activity.findActivityById(ctx.request.body['id']);
  },
  set: async function (ctx) {
    await activity.addActivity(data)
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
