const fs = require('fs')

const data = fs.readFileSync('./database.json')
const conf = JSON.parse(data)

module.exports = {
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database,
  timezone: 'Asia/Seoul',
}
