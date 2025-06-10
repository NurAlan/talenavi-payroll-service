import {basicAuth} from '../config/index.mjs'
import { response, UnauthorizedError } from '../helpers/utils/response.mjs'
const { username, password } = basicAuth

export const basic = (req, res, next) => {
  const auth = req.headers.authorization
    if (!auth) {
      return response(res, new UnauthorizedError('basic auth is required'))
    }

    const [, base64] = auth.split(' ')
    const [usernameReq, passwordReq] = Buffer.from(base64, 'base64').toString().split(':')
    if (usernameReq !== username || passwordReq !== password) {
      return response(res, new UnauthorizedError('basic auth is error'))
    }
    next()
}

export default {
  basic
}