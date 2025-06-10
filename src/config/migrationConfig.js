require('dotenv').config()
module.exports = {
  development: {
    username: process.env.MYSQL_USERNAME || 'root',
    password: process.env.MYSQL_PASSWORD || 'abrakadabra',
    database: process.env.MYSQL_DATABASE || 'payroll',
    host: process.env.MYSQL_HOST || 'localhost',
    port: parseInt(process.env.MYSQL_PORT) || 3306,
    dialect: 'mysql',
  }
}
