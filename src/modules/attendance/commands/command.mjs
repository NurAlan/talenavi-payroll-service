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
   * @param {{employeId: integer, date: string, time: string, status: string}} payload 
   * @returns 
   */
  async createAttendance(payload) {
    return await this.db.Attendance.create(payload)
  }
}