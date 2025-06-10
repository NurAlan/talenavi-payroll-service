import db from '../../../models/index.mjs'
import { ForbiddenError, InternalServerError, NotFoundError } from '../../../helpers/utils/response.mjs'
import Query from './query.mjs'
import _ from 'lodash'

export default class Employee {
  constructor () {
    this.query = new Query(db)
  }

  /**
   * 
   * @param { {page: integer, size: integer, search: string} } payload 
   * @param { {id: string, name: string, role: string} } user
   * @returns {Promise<{data: [{id: string, name: string, baseSalary: string, email: string, position: string}], meta: {totalPage: integer, totalDataOnPage: integer, totalPage: integer, page: integer, size: integer} }>}
   */
  async list(payload, user) {
    if(user.role !== 'admin') {
      throw new ForbiddenError('Access denied')
    }
    const {data, totalData} = await this.query.paginateEmployee({...payload, offset: (payload.page - 1) * payload.size})
    const transformResp = data.map(o => ({
      id: o.id,
      name: o['User.name'],
      baseSalary: new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(o.base_salary),
      email: o['User.email'],
      position: o.position
    }))

    return {data: transformResp, meta: {
      totalData,
      totalPage: Math.ceil(totalData / payload.size),
      totalDataOnPage: data.length,
      ..._.pick(payload, ['page', 'size'])
    }}
  }
}

