import { response } from '../../../helpers/utils/response.mjs'
import Setting from './domain.mjs'

const setting = new Setting()

export const get = async(req, res) => {
  const getSetting = await setting.get(
    req.user.data
  )
  return response(res, {
    message: 'list setting successfully',
    data: getSetting
  })
}

export default {
  get
}