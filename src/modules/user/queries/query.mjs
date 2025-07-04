import { Op } from "sequelize"

export default class Query {
  constructor (db) {
    this.db = db
  }

  /**
   * @param { {page: Integer, size: Integer, offset: Integer, search: String} } params
   * @returns {Promise<{data: [{id: string, name: string, email: string, role: string}, totalData: integer]}>}
   */
  async paginateUser(params) {
    const where = {}
    if(params.search) {
      where.name = {
        [Op.like]: `%${params.search}%`
      }
    }

    const {rows: data, count: totalData} = await this.db.User.findAndCountAll({
      attributes: ['id', 'email', 'name', 'role'],
      where,
      limit: params.size,
      offset: params.offset,
      order: [
        'id', 'name'
      ]
    })

    return {
      data, totalData
    }
  }

  /**
   * 
   * @param {String} id 
   * @return {Promise<{id: string}>}
   */
  async findUserById(id) {
    return this.db.User.findOne({
      where: {
        id, role: 'employee'
      },
      attributes: ['id', 'email'],
      raw: true
    })
  }

  /**
   * 
   * @param { {id: string, email: string} } payload 
   */
  async findUserEmail(payload) {
    return this.db.User.findOne({
      where: {
        id: {
          [Op.ne]: payload.id
        },
        email: payload.email
      },
      attributes: ['id']
    })
  }
}