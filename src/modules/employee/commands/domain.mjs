import db from '../../../models/index.mjs'
import { ForbiddenError, InternalServerError, NotFoundError, UnprocessableEntityError } from '../../../helpers/utils/response.mjs'
import Command from './command.mjs'
import UserQuery from '../../user/queries/query.mjs'
import _ from 'lodash'

export default class Employee {
  constructor () {
    this.command = new Command(db)
    this.userQuery = new UserQuery(db)
  }

  /**
   * 
   * @param { {userId: integer, position: string, baseSalary: integer} } payload 
   * @param { {id: string, name: string, role: string} } user
   * @returns { Promise<boolean> }
   */
  async create(payload, user) {
    try {
      if(user.role !== 'admin') {
        throw new ForbiddenError('Access denied')
      }
      const checkUser = await this.userQuery.findUserById(payload.userId)
      if(_.isEmpty(checkUser)) {
        throw new NotFoundError('UserID not found')
      }

      await this.command.createEmployee(payload)
      return true
    } catch (error) {
     if (error.name === 'SequelizeUniqueConstraintError' || error.original?.code === 'ER_DUP_ENTRY') {
        throw new UnprocessableEntityError("userID sudah terdaftar")
      }
      throw error
    }
  }
}

