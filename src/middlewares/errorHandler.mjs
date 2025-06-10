import logger from "../helpers/logger/logger.mjs"
import { HttpError, response } from "../helpers/utils/response.mjs"

export const routeErrorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }

  if (err instanceof HttpError) {
    return response(res, {
      httpCode: err.httpCode,
      message: err.message,
      data: err.data ?? null,
    })
  }

  if (process.env.NODE_ENV === 'production') {
    logger.error(err.message, err)
  } else {
    console.error(err)
  }

  return response(res, {
    httpCode: 500,
    message: 'Internal Server Error',
    data: err.message,
  })
}

export default {
  routeErrorHandler,
}