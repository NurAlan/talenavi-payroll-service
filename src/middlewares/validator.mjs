import { ZodError } from "zod"
import { UnprocessableEntityError } from "../helpers/utils/response.mjs"

/**
 * @param {import('zod').ZodSchema} schema
 */
export const validateSchema = (schema) =>
  async (req, res, next) => {
    try {
      req.locals = req.locals || {}
      req.locals.validated = await schema.parse({
        query: req.query,
        params: req.params,
        body: req.body,
      })
      next()
    } catch (err) {
      if (err instanceof ZodError) {
        return next(new UnprocessableEntityError(
          "Validation error",
          err.issues.map((issue) => ({
            src: issue.path.slice(0, 1).toString(),
            fieldName: issue.path.slice(1).join('.'),
            errorCode: issue.code,
            message: issue.message
          }))
        ))
      }
      next(err)
    }
  }


  export default {
    validateSchema
  }