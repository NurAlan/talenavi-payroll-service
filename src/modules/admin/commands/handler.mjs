import { response } from '../../../helpers/utils/response.mjs'
import Admin from './domain.mjs'

const admin = new Admin()

export const create = async (req, res) => {
  const processCreate = await admin.create(req.locals.validated)
  return response(res, {
    message: 'admin successfully created',
    data: processCreate
  })
}

export default {
  create
}