export default class Command {
  constructor (db) {
    this.db = db
  }

  /**
   * @param { {name: String, email: String, role: String, password} } payload 
   * @returns { Promise<{id: String, name: String, email: String, role: String}> }
   */
  async createUser(payload) {
    return this.db.User.create(payload)
  }
}