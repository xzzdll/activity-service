var mysql = require('mysql');
var { mysqlConfig } = require('./config');

var pool = mysql.createPool({
  host: mysqlConfig.database.HOST,
  user: mysqlConfig.database.USERNAME,
  password: mysqlConfig.database.PASSWORD,
  database: mysqlConfig.database.DATABASE
});

let allServices = {
  query: function (sql, values) {
    return new Promise((resolve, reject) => {
      pool.getConnection(function (err, connection) {
        if (err) {
          reject(err)
        } else {
          connection.query(sql, values, (err, rows) => {

            if (err) {
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
  findActivityById: function (name) {
    let _sql = `select * from users where name="${name}";`
    return allServices.query(_sql)
  },
  addActivity: (obj) => {
    let _sql = "insert into users set name=?,pass=?,avator=?,moment=?;"
    return allServices.query(_sql, obj)
  },
}

module.exports = allServices;