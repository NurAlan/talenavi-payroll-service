import { response } from '../../../helpers/utils/response.mjs'
import Bonus from './domain.mjs'

const bonus = new Bonus()

export const list = async(req, res) => {
  const listData = await bonus.list(
    req.locals.validated.query,
    req.user.data
  )
  return response(res, {
    message: 'list bonus successfully',
    data: listData.data,
    meta: listData.meta
  })
}

export default {
  list
}