import {pino} from 'pino'
import {formatInTimeZone} from 'date-fns-tz'
import {ENV, timeZone} from '../../config/index.mjs'

const pinoOptions = { 
  formatters: {
    bindings: () => ({}),
  },
  timestamp: () => `,"time":"${formatInTimeZone(new Date(), timeZone, 'yyyy-MM-dd HH:mm:ss')}"`
}

if (ENV === 'development') {
  pinoOptions.transport = {
    target: 'pino-pretty'
  }
}

const pinoLogger = pino(pinoOptions)

/**
 * 
 * @param {String} context 
 * @param {String} message 
 * @param {String} scope 
 * @param {Object} meta 
 * @returns void()
 */
export const info = (context, message, scope, meta) => {
  pinoLogger.info({
    context,
    message,
    scope,
    meta
  })
}

export default {
  info
}


