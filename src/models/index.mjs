import sequelize from '../helpers/databases/mysql.mjs'
import UserModel from './user.model.mjs'
import EmployeeModel from './employee.model.mjs'
import AttendanceModel from './attendance.model.mjs'
import BonusModel from './bonus.model.mjs'
import PayrollModel from './payroll.model.mjs'
import SettingModel from './setting.model.mjs'
import { DataTypes } from 'sequelize'

const db = {}

db.sequelize = sequelize
db.User = UserModel(sequelize, DataTypes)
db.Employee = EmployeeModel(sequelize, DataTypes)
db.Attendance = AttendanceModel(sequelize, DataTypes)
db.Bonus = BonusModel(sequelize, DataTypes)
db.Payroll = PayrollModel(sequelize, DataTypes)
db.Setting = SettingModel(sequelize, DataTypes)

Object.values(db).forEach((model) => {
  if(model.associate) {
    model.associate(db)
  }
})

export default db