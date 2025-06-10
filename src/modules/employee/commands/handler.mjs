import { response } from '../../../helpers/utils/response.mjs'
import Employee from './domain.mjs'

const employee = new Employee()

export const create = async(req, res) => {
  const insertData = await employee.create(req.locals.validated.body)
  return response(res, {
    message: 'insert employee successfully',
    data: insertData
  })
}