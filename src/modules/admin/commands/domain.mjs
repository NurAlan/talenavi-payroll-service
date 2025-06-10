import { hashsing } from '../../../helpers/utils/argon2.mjs'
import Command from './command.mjs'
import db from '../../../models/index.mjs'
import {InternalServerError, UnprocessableEntityError} from '../../../helpers/utils/response.mjs'

export default class Admin {
  constructor () { 
    this.command = new Command(db)
  }

  async create(payload) {
    try {
      const {body} = payload
      const setPassword = await hashsing(body.password)
      const insertData = await this.command.createUser({...body, password: setPassword})
      return insertData 
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError' || error.original?.code === 'ER_DUP_ENTRY') {
        throw new UnprocessableEntityError("email sudah digunakan")
      }
      throw new InternalServerError(error)
    }
  }
}