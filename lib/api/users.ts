import { Router } from 'express'
import User from '../models/user'
import authentication, {
  AuthenticationRequest,
} from '../middleware/authentication'

const router = Router()

router.get(
  '/current',
  authentication,
  async (req: AuthenticationRequest, res, next) => {
    if (!req.token) {
      return next(new Error('Token not provided'))
    }

    try {
      const id = req.token.user.id
      const doc = await User.findById(id)
      res.status(200).json(doc)
    } catch (e) {
      next(e)
    }
  }
)

router.get('/', async (_, res, next) => {
  try {
    const users = await User.find()
    res.status(200).json({ users })
  } catch (e) {
    next(e)
  }
})

router.get('/:id', async (req, res, next) => {
  interface Params {
    id: number
  }

  try {
    const { id } = req.params as Params
    const doc = await User.findById(id)

    if (!doc) {
      next(new Error('User not found'))
      return
    }

    res.status(200).json({
      message: 'success',
      payload: doc,
    })
  } catch (e) {
    next(e)
  }
})

export default router
