import db from '../../../models/index.mjs'
import { ForbiddenError, NotFoundError} from '../../../helpers/utils/response.mjs'
import Command from './command.mjs'
import EmployeQuery from '../../employee/queries/query.mjs'
import Query from '../queries/query.mjs'
import _ from 'lodash'


export default class Bonus {
  constructor () {
    this.command = new Command(db)
    this.query = new Query(db)
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

 /**
   * 
   * @param { {id: string, employeeId: string, month: string, amount: integer, description: string} } payload 
   * @param { {id: string, name: string, role: string} } user
   */
  async update(payload, user) {
    if(user.role !== 'admin') {
      throw new ForbiddenError('Access denied')
    }

    const checkBonus = await this.query.findOneBonus(payload.id)
    if(_.isNil(checkBonus)) {
      throw new NotFoundError('Data not found')
    }

    const checkUser = await this.employeQuery.findEmployeeById(payload.employeeId)
    if(_.isNil(checkUser)) {
      throw new NotFoundError('Data not found')
    }

    await this.command.updateBonus(payload.id, _.omit(payload, 'id'))
    return true
  }

  /**
   * 
   * @param { {id: string} } payload 
   * @param { {id: string, name: string, role: string} } user
   */
  async destroy(payload, user) {
    if(user.role !== 'admin') {
      throw new ForbiddenError('Access denied')
    }
    await this.command.deleteBonus(payload.id)
    return true
  }
}
