import { Router } from 'express'
import { verifyJWT } from '../../middlewares/jwtAuth.mjs'
import { validateSchema } from '../../middlewares/validator.mjs'
import { CommandSchema } from './commands/validateSchema.mjs'
import cHandler from './commands/handler.mjs'
import wrapAsync from '../../helpers/utils/wrapAsync.mjs'
const router = Router()

router.post('/check-in', verifyJWT, wrapAsync(validateSchema(CommandSchema.checkIn)), cHandler.checkIn)

export default router