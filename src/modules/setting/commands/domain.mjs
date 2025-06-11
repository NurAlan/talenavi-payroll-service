import db from '../../../models/index.mjs'
import { ForbiddenError } from '../../../helpers/utils/response.mjs'
import Command from './command.mjs'
import _ from 'lodash'


export default class Setting {
  constructor () {
    this.command = new Command(db)
  }

  /**
   * 
   * @param { {clockIn: string, clockOut: string} } payload 
   * @param { {id: string, name: string, role: string} } user
   * @returns { Promise<boolean> }
   */
  async create(payload, user) {
    if(user.role !== 'admin') {
      throw new ForbiddenError('Access denied')
    }
    await this.command.createSetting(payload)
    return true
  }
}

