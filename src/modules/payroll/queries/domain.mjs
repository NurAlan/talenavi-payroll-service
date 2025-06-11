import db from '../../../models/index.mjs'
import { ForbiddenError, NotFoundError, UnprocessableEntityError} from '../../../helpers/utils/response.mjs'
import Query from './query.mjs'
import _ from 'lodash'


export default class Payroll {
  constructor () {
    this.query = new Query(db)
  }

  /**
   * 
   * @param { {page: integer, size: integer} } payload 
   * @param { {id: string, name: string, role: string} } user
   * @returns { Promise<{data, meta}> }
   */
  async list(payload, user) {
    if(user.role !== 'admin') {
      throw new ForbiddenError('Access denied')
    }

    const {data, totalData} = await this.query.findAllPayroll({...payload, offset: (payload.page - 1) * payload.size})
    const transformData = data.map(o => ({
      id: o.id,
      month: o.month,
      calculatedSalary: o.calculatedSalary,
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

