import db from '../../../models/index.mjs'
import { ForbiddenError, InternalServerError, NotFoundError, UnprocessableEntityError } from '../../../helpers/utils/response.mjs'
import Query from '../queries/query.mjs'
import _ from 'lodash'

export default class Attendance {
  constructor () {
    this.query = new Query(db)
  }

  /**
   * 
   * @param { {} } payload 
   * @param { {id: string, name: string, role: string} } user
   * @returns { Promise<boolean> }
   */
  async list(payload, user) {
    if(user.role !== 'admin') {
      throw new ForbiddenError('Access denied')
    }
    const {data, totalData} = await this.query.findAttendancePaginated(payload)

    const transformData = data.map(o => ({
      ..._.pick(o, ['id', 'data', 'tme', 'status']),
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

