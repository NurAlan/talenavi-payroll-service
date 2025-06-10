import { Router } from "express"
const router = Router()

router.get('/', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: null,
      code: 200
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: error
    })
  }
})

export default router