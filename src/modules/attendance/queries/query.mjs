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

  /**
   * 
   * @param {string} employeeId 
   * @returns 
   */
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


 /**
   * @param { {page: Integer, size: Integer, offset: Integer, startDate: date, endDate: date} } params
   * @returns {Promise<>}
   */
  async findAttendancePaginated(params) {

    const where = {}
    if (params.startDate) {
      where.date = {
        [Op.between]: [startOfDay(params.startDate), endOfDay(params.endDate)]
      }
    }
    
    const {rows: data, count: totalData} = await this.db.Attendance.findAndCountAll({
      attributes: ['date', 'time', 'id', 'status'],
      include: [
        {
          association: 'Employee',
          attributes: ['position'],
          include: [
            {association: 'User', attributes: ['name']}
          ]
        }
      ],
      where: {
        ...where
      },
      limit: params.size,
      offset: params.offset,
      order: [
        'id'
      ],
      raw: true
    })

    return {
      data, totalData
    }
  }
}