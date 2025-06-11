export default class Command {
  constructor (db) {
    /**
     * @typedef {import('../../../models/index.mjs')} db
     */
    this.db = db
  }

  /**
   * 
   * @param {{employeeId: string, month: string, calculatedSalary}} payload
   * @returns 
   */
  async insertPayroll(payload) {
    return await this.db.Payroll.create(payload)
  }
}