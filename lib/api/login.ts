import { Router } from 'express'
import { User, UserSchema } from '../models'
import tokenService from '../services/token'

const router = Router()

router.post('/', async (req, res, next) => {
  interface Body {
    email?: UserSchema['email']
    username?: UserSchema['username']
    password?: UserSchema['password']
  }

  const { email, password } = req.body as Body
  try {
    const user = await User.findOne({ email })

    if (!email)
      return next(
        new Error(`Please enter the email address associated with your account`)
      )

    if (!user)
      return next(new Error(`Couldn't find a user with the email ${email}`))

    if (!password)
      return next(new Error(`No password was provided for the email ${email}`))

    const match = await user.comparePassword(password)

    if (match) {
      const token = tokenService.create(user)
      res.status(200).json({ token })
    } else {
      next(new Error('Incorrect password provided'))
    }
  } catch (e) {
    next(e)
  }
})

export default router
