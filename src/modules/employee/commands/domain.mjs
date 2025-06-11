import db from '../../../models/index.mjs'
import { ForbiddenError, InternalServerError, NotFoundError, UnprocessableEntityError } from '../../../helpers/utils/response.mjs'
import Command from './command.mjs'
import Query from '../queries/query.mjs'
import UserQuery from '../../user/queries/query.mjs'
import _ from 'lodash'
import sequelize from '../../../helpers/databases/mysql.mjs'
import { hashsing } from '../../../helpers/utils/argon2.mjs'
import { defaultPassword } from '../../../config/index.mjs'


export default class Employee {
  constructor () {
    this.command = new Command(db)
    this.userQuery = new UserQuery(db)
    this.query = new Query(db)
  }

  /**
   * 
   * @param { {name: string, email: string, position: string, baseSalary: integer} } payload 
   * @param { {id: string, name: string, role: string} } user
   * @returns { Promise<boolean> }
   */
  async create(payload, user) {
    try {
      if(user.role !== 'admin') {
        throw new ForbiddenError('Access denied')
      }

      const t = await sequelize.transaction()
      const userData = {
        ..._.pick(payload, ['name', 'email']),
        password: await hashsing(defaultPassword),
        role: 'employee'
      }
      const getUser = await this.command.findOrCreateUser(userData, t)
      const bodyEmployee = {
        userId: getUser.userData.id,
        ..._.pick(payload, ['baseSalary','possition', 'position'])
      }
      await this.command.createEmployee(bodyEmployee, t)
      await t.commit()

      return true
    } catch (error) {
     if (error.name === 'SequelizeUniqueConstraintError' || error.original?.code === 'ER_DUP_ENTRY') {
        throw new UnprocessableEntityError("email sudah terdaftar")
      }
      throw error
    }
  }

  /**
   * 
   * @param { {id: string, name: string, email: string, position: string, baseSalary: integer} } payload 
   * @param { {id: string, name: string, role: string} } user
   * @returns { Promise<boolean> }
   */
  async update(payload, user) {
    if(user.role !== 'admin') {
        throw new ForbiddenError('Access denied')
    }

    //checkEmployeeId
    const findEmployeById = await this.query.findEmployeeById(payload.id)
    if(_.isNil(findEmployeById)) {
      throw new NotFoundError('Data not found')
    }

    const checkEmail = await this.userQuery.findUserEmail({id: findEmployeById.userId, email: payload.email})
    if(!_.isNil(checkEmail)) {
      throw new UnprocessableEntityError('email sudah digunakan orang lain')
    }

    const t = await sequelize.transaction()
    await this.command.updateEmployee(payload.id, _.pick(payload, ['position', 'baseSalary']), t)
    await this.command.updateUser(findEmployeById.userId, _.pick(payload, ['email', 'name']), t)
    await t.commit()
    return true
  }

  /**
   * 
   * @param {{id: string}} payload 
   * @param { {id: string, name: string, role: string} } user
   */
  async destroy(payload, user) {
    if(user.role !== 'admin') {
      throw new ForbiddenError('Access denied')
    }

    const getEmployee = await this.query.findEmployeeById(payload.id)
    if(_.isNil(getEmployee)) {
      throw new NotFoundError('Data not found')
    }

    const t = await sequelize.transaction()
    const destroyEmployee = await this.command.destroyEmployee(payload.id, t)
    const destroyUser = await this.command.destroyUser(getEmployee.userId, t)
    await t.commit()
    return true
  }
}

