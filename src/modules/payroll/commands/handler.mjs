import { response } from '../../../helpers/utils/response.mjs'
import Payroll from './domain.mjs'

const payroll = new Payroll()

export const create = async(req, res) => {
  const insertData = await payroll.create(
    req.locals.validated.body,
    req.user.data
  )
  return response(res, {
    message: 'insert payroll successfully',
    data: insertData
  })
}

export default {
  create
}