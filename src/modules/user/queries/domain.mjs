import db from '../../../models/index.mjs'
import {ForbiddenError} from '../../../helpers/utils/response.mjs'
import _ from 'lodash'
import Query from './query.mjs'

export default class User {
  constructor () {
    this.query = new Query(db)
  }

  /**
   * 
   * @param {{page: Integer, size: Integer, search: String}} payload 
   * @param { {id: string, role: string, name: string} } user
   * @returns { Promise<{data: [{id: string, name: string, email: string, role: string}], meta: {totalData: integer, totalDataOnPage: integer, totalPage: integer} }> }
   */
  async list (payload, user) {
    if (user.data.role !== 'admin') {
      throw new ForbiddenError('Access denied')
    }
    const getData = await this.query.paginateUser({...payload, offset: (payload.page - 1) * payload.size})
    return {
      data: getData.data,
      meta: {
        totalData: getData.totalData,
        totalPage: Math.ceil(getData.totalData / payload.size),
        totalDataOnPage: getData.data.length,
        page: payload.page,
        size: payload.size
      }
    }
  }
}