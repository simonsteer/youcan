import { Router } from 'express'
import { User, UserSchema } from '../models'

const router = Router()

router.post('/', async (req, res, next) => {
  interface Body {
    email?: UserSchema['email']
    username?: UserSchema['username']
    password?: UserSchema['password']
  }
  const { email, username, password } = req.body as Body

  const IUser = new User({ email, username, password })
  try {
    const user = await IUser.save()
    res.status(201).json({ user })
  } catch (e) {
    next(e)
  }
})

export default router
