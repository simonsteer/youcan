import { Router } from 'express'
const router = Router()

router.get('/', (_, res) => {
  res.status(200).json({ message: 'success!' })
})

export default router
