import { response } from '../../../helpers/utils/response.mjs'
import Employee from './domain.mjs'

const employee = new Employee()

export const list = async(req, res) => {
  const listData = await employee.list(
    req.locals.validated.query,
    req.user.data
  )
  return response(res, {
    message: 'list employee successfully',
    data: listData.data,
    meta: listData.meta
  })
}

export default {
  list
}