export default class Command {

  constructor (db) {
    /**
     * @typedef {import('../../../models/index.mjs')} db
     */
    this.db = db
  }

  async createUser(payload) {
    return await this.db.User.create({
      name: payload.name,
      email: payload.email,
      password: payload.password,
      role: 'admin'
    })
  }
}