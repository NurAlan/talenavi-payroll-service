import { Router } from 'express'
import { verifyJWT } from '../../middlewares/jwtAuth.mjs'
import { validateSchema } from '../../middlewares/validator.mjs'
import { CommandSchema } from './commands/validateSchema.mjs'
import { QuerySchema } from './queries/validateSchema.mjs'
import cHandler from './commands/handler.mjs'
import qHandler from './queries/handler.mjs'
import wrapAsync from '../../helpers/utils/wrapAsync.mjs'
const router = Router()

router.post('/create', verifyJWT, wrapAsync(validateSchema(CommandSchema.create)), cHandler.create)
router.get('/', verifyJWT, wrapAsync(validateSchema(QuerySchema.list)), qHandler.list)
router.patch('/:id', verifyJWT, wrapAsync(validateSchema(CommandSchema.update)), cHandler.update)
router.delete('/:id', verifyJWT, wrapAsync(validateSchema(CommandSchema.delete)), cHandler.destroy)

export default router