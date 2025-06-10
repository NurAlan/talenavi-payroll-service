import pkg from 'jsonwebtoken'
const {sign} = pkg
import { jwtKeyPair, jwtOptions } from '../config/index.mjs'

/**
 * 
 * @param { {role: string, name: string, id: string} } payload 
 * @param {subject: string, expiresIn: string} options 
 * @returns 
 */
export const jwtSign = (payload, options) =>
  sign(payload, jwtKeyPair.private, {
    ...jwtOptions,
    subject: options.subject || '',
    expiresIn: options.expiresIn,
  })

export default jwtSign
