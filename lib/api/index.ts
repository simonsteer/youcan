import { Router } from 'express'
import healthcheck from './healthcheck'
import signup from './signup'
import login from './login'
import users from './users'
import applications from './applications'

const router = Router()

router.use('/healthcheck', healthcheck)
router.use('/signup', signup)
router.use('/login', login)
router.use('/users', users)
router.use('/applications', applications)

export default router

export const RESOURCES = {
  healthcheck,
  signup,
  login,
  users,
}
