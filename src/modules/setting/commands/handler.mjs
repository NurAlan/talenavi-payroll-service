import { response } from '../../../helpers/utils/response.mjs'
import Setting from './domain.mjs'

const setting = new Setting()

export const create = async(req, res) => {
  const insertData = await setting.create(
    req.locals.validated.body,
    req.user.data
  )
  return response(res, {
    message: 'create setting successfully',
    data: insertData
  })
}

export default {
  create
}