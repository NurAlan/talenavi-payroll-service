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
   * @param {{clockIn: string, clockOut: string}} payload
   * @returns { Promise<> }
   */
  async createSetting(payload) {
    return await this.db.Setting.upsert({
      id: 4,
      ...payload
    })
  }
}