import { response } from '../../../helpers/utils/response.mjs'
import Employee from './domain.mjs'

const employee = new Employee()

export const create = async(req, res) => {
  const insertData = await employee.create(
    req.locals.validated.body,
    req.user.data
  )
  return response(res, {
    message: 'insert employee successfully',
    data: insertData
  })
}

export const update = async(req, res) => {
  const updateData = await employee.update(
    {...req.locals.validated.body, ...req.locals.validated.params},
    req.user.data
  )
  return response(res, {
    message: 'update employee successfully',
    data: updateData
  })
}

export const destroy = async(req, res) => {
  const updateData = await employee.destroy(
    req.locals.validated.params,
    req.user.data
  )
  return response(res, {
    message: 'delete employee successfully',
    data: updateData
  })
}

export default {
  create,
  update,
  destroy
}