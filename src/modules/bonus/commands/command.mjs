export default class Command {
  constructor (db) {
    /**
     * @typedef {import('../../../models/index.mjs')} db
     */
    this.db = db
  }

  /**
   * 
   * @param {{employeeId: string, month: string, amount: integer, description: string}} payload 
   * @returns {Promise<{id: string, employeeId: string, month: string, amount: integer, description: string}>}
   */
  async createBonus(payload) {
    return await this.db.Bonus.create(payload)
  }
}