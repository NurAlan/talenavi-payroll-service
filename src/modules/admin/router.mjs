import {Router} from 'express'
import { basic } from '../../middlewares/basicAuth.mjs'
import { validateSchema } from '../../middlewares/validator.mjs'
import { AdminSchema } from './commands/validationSchema.mjs'
import wrapAsync from '../../helpers/utils/wrapAsync.mjs'
import handler from './commands/handler.mjs'
const router = Router()

router.post('/create', basic, wrapAsync(validateSchema(AdminSchema.create)), handler.create)

export default router
