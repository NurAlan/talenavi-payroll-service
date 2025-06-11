import db from '../../../models/index.mjs'
import { ForbiddenError, NotFoundError} from '../../../helpers/utils/response.mjs'
import Command from './command.mjs'
import EmployeQuery from '../../employee/queries/query.mjs'
import _ from 'lodash'


export default class Bonus {
  constructor () {
    this.command = new Command(db)
    this.employeQuery = new EmployeQuery(db)
  }

  /**
   * 
   * @param { {employeeId: string, month: string, amount: integer, description: string} } payload 
   * @param { {id: string, name: string, role: string} } user
   * @returns { Promise<boolean> }
   */
  async create(payload, user) {
    if(user.role !== 'admin') {
      throw new ForbiddenError('Access denied')
    }

    const getEmploye = await this.employeQuery.findEmployeeById(payload.employeeId)
    if(_.isNil(getEmploye)) {
      throw new NotFoundError('Data not found')
    }

    const insertBonus = await this.command.createBonus(payload)
    return insertBonus
  }
}
