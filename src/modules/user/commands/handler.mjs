import { response } from '../../../helpers/utils/response.mjs'
import User from './domain.mjs'

const user = new User()

export const registerUser = async (req, res) => {
  const registration = await user.register(req.locals.validated.body)
  return response(res, {
    message: 'registration success',
    data: registration
  })
}

export default {
  registerUser,
}