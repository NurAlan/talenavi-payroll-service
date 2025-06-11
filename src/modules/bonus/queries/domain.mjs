import db from '../../../models/index.mjs'
import { ForbiddenError, NotFoundError} from '../../../helpers/utils/response.mjs'
import Query from './query.mjs'
import _ from 'lodash'


export default class Bonus {
  constructor () {
    this.query = new Query(db)
  }

  /**
   * 
   * @param { {page: integer, size: integer, search: integer} } payload 
   * @param { {id: string, name: string, role: string} } user
   * @returns { Promise<{data: [{}], meta: <object>}> }
   */
  async list(payload, user) {
    if(user.role !== 'admin') {
      throw new ForbiddenError('Access denied')
    }

    const {data, totalData} = await this.query.list({...payload, offset: (payload.page - 1) * payload.size})
    const transformData = data.map(o => ({
      ..._.pick(o, ['id', 'employeId', 'month', 'amount', 'description']),
      position: o['Employee.position'],
      name: o['Employee.User.name']
    }))

    return {
      data: transformData,
      meta: {
        totalData,
        totalPage: Math.ceil(totalData/payload.size),
        totalDataOnPage: data.length,
        ..._.pick(payload, ['page', 'size'])
      }
    }
  }
}
