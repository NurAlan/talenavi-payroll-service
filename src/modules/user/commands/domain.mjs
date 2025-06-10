import db from '../../../models/index.mjs'
import {InternalServerError, UnprocessableEntityError} from '../../../helpers/utils/response.mjs'
import {hashsing} from '../../../helpers/utils/argon2.mjs'
import _ from 'lodash'
import Command from './command.mjs'

export default class User {
  constructor () {
    this.command = new Command(db)
  }

  /**
   * @param { {name: String, email: String, role: String, password: String} } payload 
   * @returns { Promise<{id: String, name: String, email: String, role: String}> }
   */
  async register(payload) {
    try {
      const hashPassword = await hashsing(payload.password)
      const setDocument = {
        ..._.omit(payload, 'confirmPassword'),
        password: hashPassword
      }
      const insertUser = await this.command.createUser(setDocument)
      return insertUser
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError' || error.original?.code === 'ER_DUP_ENTRY') {
        throw new UnprocessableEntityError("email sudah digunakan")
      }
      throw new InternalServerError(error)
    }
  }

}