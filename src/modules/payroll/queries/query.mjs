import { endOfMonth, startOfMonth } from 'date-fns'
import { Op } from 'sequelize'

export default class Query {
  constructor (db) {
    /**
     * @typedef {import('../../../models/index.mjs')} db
     */
    this.db = db
  }

  /**
   * 
   * @param {{employeeId: string, month: date}} payload
   * @returns 
   */
  async checkPayrollByIdMonth(payload) {
    return await this.db.Payroll.findOne({
      where: {
        employeeId: payload.employeeId,
        month: {
          [Op.between]: [startOfMonth(payload.month), endOfMonth(payload.month)]
        }
      },
      attributes: {exclude: ['createdAt', 'updatedAt','deletedAt']}
    })
  }

  /**
   * 
   * @param { {employeeId: string, startDate: Date, endDate: date} } payload
   * @returns {Promise<{rows: integer, count}>}
   */
  async findAttendance(payload) {
    return await this.db.Attendance.findAndCountAll({
      where: {
        employeeId: payload.employeeId,
        date: {
          [Op.between]: [
            payload.startDate,
            payload.endDate
          ]
        },
        status: {
          [Op.ne]: 'alfa'
        },
      },
      attributes: {exclude: ['createdAt', 'updatedAt', 'deletedAt']}
    })
  }

  /**
   * 
   * @param {{page: integer, size: integer, offset: integer}} params 
   * @returns { Promise<{data, totalData: integer}> }
   */
  async findAllPayroll(params) {
    const {rows: data, count: totalData} = await this.db.Payroll.findAndCountAll({
      attributes: {exclude: ['createdAt', 'updatedAt', 'deletedAt']},
      include: [
        {
          association: 'Employee',
          attributes: ['position'],
          include: [
            {association: 'User', attributes: ['name']}
          ]
        }
      ],
      limit: params.size,
      offset: params.offset,
      order: ['id'],
      raw: true
    })
    return {data, totalData}
  }

  /**
   * 
   * @param { {startMonth: date, endMonth: date}  } params 
   */
  async findPayroll(params) {
    return await this.db.Payroll.findAll({
      where: {
        month: {
          [Op.between]: [startOfMonth(params.startMonth), endOfMonth(params.endMonth)]
        }
      },
      attribute: {exclude: ['createdAt', 'updatedAt', 'deletedAt']},
      include:[
        {
          association: 'Employee',
          attributes: ['position', 'baseSalary'],
          include: [
            {association: 'User', attributes: ['name', 'role']}
          ]
        }
      ],
      raw: true
    })
  }
}