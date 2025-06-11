import { response } from '../../../helpers/utils/response.mjs'
import Attendance from './domain.mjs'

const attendance = new Attendance()

export const checkIn = async(req, res) => {
  const insertData = await attendance.checkIn(
    req.locals.validated.body,
    req.user.data
  )
  return response(res, {
    message: 'insert attendance successfully',
    data: insertData
  })
}

export default {
  checkIn,
}