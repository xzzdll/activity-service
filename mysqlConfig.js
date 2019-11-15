var mysql = require('mysql');
var { mysqlConfig } = require('./config');

var pool = mysql.createPool({
  host: mysqlConfig.database.HOST,
  user: mysqlConfig.database.USERNAME,
  password: mysqlConfig.database.PASSWORD,
  database: mysqlConfig.database.DATABASE
});

let allServices = {
  query: function (sql) {
    return new Promise((resolve, reject) => {
      pool.getConnection(function (err, connection) {
        if (err) {
          reject(err)
        } else {
          connection.query(sql, (err, rows) => {
            if (err) {
              console.log(err)
              reject(err)
            } else {
              resolve(rows)
            }
            connection.release()
          })
        }
      })
    })

  },
  findActivityById: function (id) {
    let _sql = `select * from list where activity_id=${id};`
    return allServices.query(_sql)
  },
  addActivity: (id,json) => {
    let _sql = `insert into list set activity_id=${id},activity_json='${json}';`
    return allServices.query(_sql)
  },
}

module.exports = allServices;