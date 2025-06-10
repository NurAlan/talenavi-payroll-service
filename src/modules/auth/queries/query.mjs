export default class Query {
  constructor (db) {
    this.db = db
  }
  /**
   * 
   * @param { {email: String} } payload 
   * @returns {Promise<{ name: String, email: String, password: String, role: String}> }
   */
  async findOneUser(payload) {
    return await this.db.User.findOne({
      where: {
        email: payload.email
      },
      attributes: ['id', 'name', 'email', 'password', 'role'],
      raw: true
    },)
  }
}