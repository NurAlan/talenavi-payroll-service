import 'dotenv/config'
import getenv from 'getenv'

export const ENV = getenv('ENV', 'development')
export const timeZone = getenv('TIME_ZONE', 'UTC')
export const port = getenv('PORT', 9000)
export const host = getenv('HOST', ENV === 'production' ? '0.0.0.0' : '127.0.0.1')
export const basicAuth = {
  username: getenv('BASIC_USERNAME', 'john'),
  password: getenv('BASIC_PASSWORD', 'abrakadabra')
}

export const mongodbUrl = getenv('MONGODB_URL', '')
export const jwtKeyPair = {
  public: getenv('RSA_PUBLIC_KEY', '').replaceAll('\\n', '\n'),
  private: getenv('RSA_PRIVATE_KEY', '').replaceAll('\\n', '\n'),
  passphrase: getenv('RSA_PASSPHRASE', '')
}
export const jwtOptions = {
  algorithm: getenv('JWT_ALG','RS256'),
  audience: getenv('JWT_AUDIENCE', 'doraemon'),
  issuer: getenv('JWT_ISSUER', 'nobita')
}

export const mysqlConf = {
  host: getenv('MYSQL_HOST', 'localhost'),
  port: getenv.int('MYSQL_PORT', 3306),
  username: getenv('MYSQL_USERNAME', 'root'),
  password: getenv('MYSQL_PASSWORD', 'abrakadabra'),
  database: getenv('MSYQL_DATABASE', 'payroll')
}