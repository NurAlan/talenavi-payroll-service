import { Router } from 'express'
import employeRouter from '../modules/employee/router.mjs'
import auth from '../modules/auth/router.mjs'
import admin from '../modules/admin/router.mjs'
import user from '../modules/user/router.mjs'

const router = Router()

router.use('/employe', employeRouter)
router.use('/auth', auth)
router.use('/admin', admin)
router.use('/user', user)

router.get('/health-check', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      code: 200,
      message: `service running properly`
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      code: 500,
      message: error
    })
  }
})

export default router