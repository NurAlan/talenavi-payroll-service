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
   * @returns 
   */
  async createEmployee(payload) {
    return await this.db.Employee.create(payload)
  }
}