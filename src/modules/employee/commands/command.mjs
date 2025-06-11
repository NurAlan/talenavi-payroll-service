import _ from 'lodash'

export default class Command {
  constructor (db) {
    /**
     * @typedef {import('../../../models/index.mjs')} db
     */
    this.db = db
  }

  /**
   * 
   * @param {{userId: integer, position: string, baseSalary: integer}} payload 
   * @param {import('sequelize').Transaction} transaction
   * @returns 
   */
  async createEmployee(payload, transaction) {
    return await this.db.Employee.create(payload, {transaction})
  }

  /**
   * 
   * @param { {name: string, password: string, role:string, email: string} } payload 
   * @param {import('sequelize').Transaction} transaction
   * @return { Promise<{userData: {id: string}, created: boolean}> }
   */
  async findOrCreateUser(payload, transaction) {
    const [user, created] = await this.db.User.findOrCreate({
      where: {
        email: payload.email,
        role: payload.role
      },
      defaults: {
        ..._.omit(payload, 'email')
      },
      attributes: ['id'],
      transaction
    },)
    return {userData: user, created}
  }

  /**
   * @param {string} id 
   * @param {{position: string, baseSalary: integer}} payload 
   * @param {import('sequelize').Transaction} transaction
   */
  async updateEmployee(id, payload, transaction) {
    return await this.db.Employee.update(payload,{
      where: {id},
      transaction
    })
  }

  /**
   * @param {string} id 
   * @param {{email: string, name: string}} payload 
   * @param {import('sequelize').Transaction} transaction
   */
  async updateUser(id, payload, transaction) {
    return await this.db.User.update(payload,{
      where: {id},
      transaction
    })
  }

  /**
   * 
   * @param {string} id 
   * @param {import('sequelize').Transaction} transaction
   */
  async destroyEmployee(id, transaction) {
    return await this.db.Employee.destroy({
      where: {id},
      transaction
    })
  }

  /**
   * 
   * @param {string} id 
   * @param {import('sequelize').Transaction} transaction
   */
  async destroyUser(id, transaction) {
    return await this.db.User.destroy({
      where: {id},
      transaction
    })
  }
}