export default class Command {
  constructor (db) {
    /**
     * @typedef {import('../../../models/index.mjs')} db
     */
    this.db = db
  }

  async createEmployee(payload) {
    return await this.db.Employee.create(payload)
  }
}