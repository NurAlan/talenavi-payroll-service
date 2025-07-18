import { Router } from 'express'
import employeRouter from '../modules/employee/router.mjs'
import auth from '../modules/auth/router.mjs'
import admin from '../modules/admin/router.mjs'
import user from '../modules/user/router.mjs'
import setting from '../modules/setting/router.mjs'
import attendance from '../modules/attendance/router.mjs'
import bonus from '../modules/bonus/router.mjs'
import payroll from '../modules/payroll/router.mjs'

const router = Router()

router.use('/employee', employeRouter)
router.use('/auth', auth)
router.use('/admin', admin)
router.use('/user', user)
router.use('/setting', setting)
router.use('/attendance', attendance)
router.use('/bonus', bonus)
router.use('/payroll', payroll)

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