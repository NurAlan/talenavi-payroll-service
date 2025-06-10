import jwt from 'jsonwebtoken'
import { UnauthorizedError } from '../helpers/utils/response.mjs'
import { jwtKeyPair, jwtOptions } from '../config/index.mjs'

const { verify, TokenExpiredError } = jwt

export const verifyJWT = async (req, res, next) => {
  const authHeader = req.get('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthorizedError('Invalid token.')
  }

  const token = authHeader.replace(/^Bearer /, '')
  try {
    const decoded = verify(token, jwtKeyPair.public, jwtOptions)
    req.user = { data: decoded }
    next()
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      throw new UnauthorizedError('Token expired.')
    }
    throw new UnauthorizedError('Invalid token.')
  }
}

export default {
  verifyJWT,
}
