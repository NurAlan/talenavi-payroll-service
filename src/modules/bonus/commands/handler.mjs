import { response } from '../../../helpers/utils/response.mjs'
import Bonus from './domain.mjs'

const bonus = new Bonus()

export const create = async(req, res) => {
  const insertData = await bonus.create(
    req.locals.validated.body,
    req.user.data
  )
  return response(res, {
    message: 'insert bonus successfully',
    data: insertData
  })
}

export default {
  create
}