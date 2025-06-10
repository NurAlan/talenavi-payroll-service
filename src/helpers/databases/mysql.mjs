import { Sequelize } from 'sequelize'
import { mysqlConf } from '../../config/index.mjs'

const sequelize = new Sequelize(mysqlConf.database, mysqlConf.username, mysqlConf.password, {
  host: mysqlConf.host,
  port: mysqlConf.port,
  dialect: 'mysql',
  logging: false,
  define: {
    freezeTableName: true,
    underscored: true,
    timestamps: true,
    paranoid: true
  }
})

export default sequelize