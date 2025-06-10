import { Router } from 'express'
import { verifyJWT } from '../../middlewares/jwtAuth.mjs'
import { validateSchema } from '../../middlewares/validator.mjs'
import wrapAsync from '../../helpers/utils/wrapAsync.mjs'
const router = Router()

router.post('/create', verifyJWT)

export default router