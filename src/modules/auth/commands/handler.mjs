import {response} from "../../../helpers/utils/response.mjs"
import Auth from './domain.mjs'

const auth = new Auth()


export const login = async (req, res) => {
  const processLogin = await auth.login(req.locals.validated.body)
  return response(res, {
    message: 'login successfully',
    data: processLogin,
  })
}

export const status = async (req, res) => {
  const checkToken = await auth.checkToken(req.user)
  return response(res, {
    message: 'check token successfully',
    data: checkToken
  })
}

export default {
  login,
  status
}