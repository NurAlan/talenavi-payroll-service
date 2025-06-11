import { endOfDay, startOfDay } from "date-fns"
import { Op } from "sequelize"

export default class Query {
  constructor (db) {
    this.db = db
  }

  /**
   * 
   * @param {String} id 
   * @return {Promise<{id: string, userId: string}>}
   */
  async findEmployeeByUserId(id) {
    return this.db.Employee.findOne({
      where: {
        userId: id
      }
    })
  }

  /**
   * 
   * @returns {Promise<{clockIn: string, clockOut: string}>}
   */
  async findSetting() {
    return this.db.Setting.findOne({
      attributes: ['clockIn', 'clockOut']
    })
  }

  async findAttendanceById(employeeId) {
    const now = new Date()
    return this.db.Attendance.findOne({
      where: {
        employeeId,
        createdAt: {
          [Op.between]: [startOfDay(now), endOfDay(now)]
        }
      },
      attributes: ['id']
    })
  }
}