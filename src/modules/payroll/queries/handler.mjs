import { response } from '../../../helpers/utils/response.mjs'
import Payroll from './domain.mjs'

const payroll = new Payroll()

export const list = async(req, res) => {
  const getData = await payroll.list(
    req.locals.validated.query,
    req.user.data
  )
  return response(res, {
    message: 'get payroll successfully',
    data: getData.data,
    meta: getData.meta
  })
}

export default {
  list
}