import {Router} from 'express'
import { basic } from '../../middlewares/basicAuth.mjs'
import { verifyJWT } from '../../middlewares/jwtAuth.mjs'
import { validateSchema } from '../../middlewares/validator.mjs'
import { UserSchema } from './commands/validationSchema.mjs'
import { QuerySchema } from './queries/validationSchema.mjs'
import wrapAsync from '../../helpers/utils/wrapAsync.mjs'
import chandler from './commands/handler.mjs'
import qhandler from './queries/handler.mjs'
const router = Router()

router.get('/', verifyJWT, wrapAsync(validateSchema(QuerySchema.list)), qhandler.list)
router.post('/register', basic, wrapAsync(validateSchema(UserSchema.register)), chandler.registerUser)

export default router