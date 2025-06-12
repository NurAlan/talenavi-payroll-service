import { response } from '../../../helpers/utils/response.mjs'
import Attendance from './domain.mjs'

const attendance = new Attendance()

export const list = async(req, res) => {
  const getData = await attendance.list(
    req.locals.validated.query,
    req.user.data
  )
  return response(res, {
    message: 'get attendance successfully',
    data: getData.data,
    meta: getData.meta
  })
}

export default {
  list
}