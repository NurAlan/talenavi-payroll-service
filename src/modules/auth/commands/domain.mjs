import jwtSign from '../../../middlewares/jwtSign.mjs'
import Query from '../queries/query.mjs'
import db from '../../../models/index.mjs'
import { NotFoundError, UnauthorizedError } from '../../../helpers/utils/response.mjs'
import _ from 'lodash'
import { verifyhash } from '../../../helpers/utils/argon2.mjs'

export default class Auth {
  constructor() {
    this.query = new Query(db)
  }

  /**
   * 
   * @param { {email: String, password: String} } payload 
   */
  async login(payload) {
    //find user
    const getUser = await this.query.findOneUser(payload)
    if(_.isEmpty(getUser)) {
      throw new NotFoundError('User not found')
    }

    //validatePassword
    const verifyPass = await verifyhash(getUser.password, payload.password)
    if (!verifyPass) {
      throw new UnauthorizedError('Unauthorized Error')
    }

    return {
      token: jwtSign(_.omit(getUser, ['password', 'email']), {
        expiresIn: '1h',
        subject: 'talenavi'
      })
  } 
  }

  async checkToken(payload) {
    return payload.data
  }
}