import { Op } from "sequelize"

export default class Query {
  constructor (db) {
    this.db = db
  }

  /**
   * @param { {page: Integer, size: Integer, offset: Integer, search: String} } params
   * @returns {Promise<{data: [{id: string, name: string, email: string, role: string}, totalData: integer]}>}
   */
  async paginateEmployee(params) {
    const {rows: data, count: totalData} = await this.db.Employee.findAndCountAll({
      attributes: ['position', 'base_salary', 'id'],
      include: [
        {
          association: 'User',
          attributes: ['name', 'email', 'role']
        }
      ],
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

  /**
   * 
   * @param {String} id 
   * @return {Promise<{id: string, userId: string, baseSalary: integer}>}
   */
  async findEmployeeById(id) {
    return this.db.Employee.findOne({
      where: {
        id
      }
    })
  }
}