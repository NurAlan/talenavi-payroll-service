import db from '../../../models/index.mjs'
import { ForbiddenError } from '../../../helpers/utils/response.mjs'
import Query from './query.mjs'
import _ from 'lodash'


export default class Setting {
  constructor () {
    this.query = new Query(db)
  }

  /**
   * 
   * @param { {id: string, name: string, role: string} } user
   * @returns { Promise<boolean> }
   */
  async get(user) {
    if(user.role !== 'admin') {
      throw new ForbiddenError('Access denied')
    }
    const getSetting = await this.query.getSetting()
    return getSetting
  }
}

