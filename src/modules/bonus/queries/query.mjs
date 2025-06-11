import { Op } from 'sequelize'

export default class Command {
  constructor (db) {
    /**
     * @typedef {import('../../../models/index.mjs')} db
     */
    this.db = db
  }

  /**
   * 
   * @param {{page:integer, size: integer, offset: integer, search: integer}} params 
   * @returns {Promise<>}
   */
  async list(params) {
    const {rows: data, count: totalData} = await this.db.Bonus.findAndCountAll({
      attributes: {exclude: ['createdAt', 'updatedAt', 'deletedAt', 'employeId']},
      include: [
        {
          association: 'Employee',
          attributes: ['position'],
          include: [
            {
              association: 'User',
              attributes: ['name'],
            }
          ]
        }
      ],
      limit: params.size,
      offset: params.offset,
      order: [
        'id'
      ],
      raw: true
    })

    return {data, totalData}
  }

  /**
   * 
   * @param {string} id 
   */
  async findOneBonus(id) {
    return await this.db.Bonus.findOne({
      where: {id},
      attributes: {exclude: ['createdAt', 'updatedAt', 'deletedAt']}
    })
  }
}