import { Router } from "express"
import { basic } from "../../middlewares/basicAuth.mjs"
import {verifyJWT} from "../../middlewares/jwtAuth.mjs"
import { validateSchema } from "../../middlewares/validator.mjs"
import {AuthSchema} from "./commands/validationSchema.mjs"
import handler from "./commands/handler.mjs"
import wrapAsync from '../../helpers/utils/wrapAsync.mjs'
const router = Router()

router.post("/login", basic, wrapAsync(validateSchema(AuthSchema.login)),  handler.login)
router.get("/user", verifyJWT, handler.status)

export default router