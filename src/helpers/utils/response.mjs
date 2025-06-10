export const response = (res, bodyResponse) => {
  if(!bodyResponse.httpCode) {
    bodyResponse.httpCode = 200
  }

  if(!bodyResponse.data) {
    bodyResponse.data = null
  }

  res.status(bodyResponse.httpCode).json({
    ...bodyResponse,
    httpCode: undefined
  })
}

export class HttpError extends Error {}

export class BadRequestError extends HttpError {
  /** @param {String} message */
  constructor(message) {
    super(message)
    this.name = 'BadRequestError'
    this.httpCode = 400
  }
}

export class UnauthorizedError extends HttpError {
  /** @param {String} message */
  constructor(message) {
    super(message)
    this.name = 'UnauthorizedError'
    this.httpCode = 401
  }
}

export class ForbiddenError extends HttpError {
  /** @param {String} message */
  constructor(message) {
    super(message)
    this.name = 'ForbiddenError'
    this.httpCode = 403
  }
}

export class NotFoundError extends HttpError {
  /** @param {String} message */
  constructor(message) {
    super(message)
    this.name = 'NotFoundError'
    this.httpCode = 404
  }
}

export class UnprocessableEntityError extends HttpError {
  /**
   * @param {String} message 
   * @param {*} data 
   */
  constructor(message, data = undefined) {
    super(message)
    this.name = 'UnprocessableEntityError'
    this.httpCode = 422
    this.data = data
  }
}

export class InternalServerError extends HttpError {
  /** @param {String} message */
  constructor(message, data = undefined) {
    super(message)
    this.name = 'InternalServerError'
    this.httpCode = 500
  }
}

export class ServiceUnavailableError extends HttpError {
  /** @param {String} message */
  constructor(message, data = undefined) {
    super(message)
    this.name = 'ServiceUnavailableError'
    this.httpCode = 503
    this.data = data
  }
}
