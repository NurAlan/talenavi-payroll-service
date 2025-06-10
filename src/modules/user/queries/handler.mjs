import { response } from '../../../helpers/utils/response.mjs'
import User from './domain.mjs'

const user = new User()

export const list = async(req, res) => {
  const list = await user.list(
    req.locals.validated.query,
    req.user
  )
  return response(res, {
    message: 'get users success',
    data: list.data,
    meta: list.meta
  })
}

export default {
  list
}