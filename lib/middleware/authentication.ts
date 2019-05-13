import { Request } from 'express'
import token from '../services/token'
import { Middleware } from './types'

export interface AuthenticationRequest extends Request {
  token?: ReturnType<typeof token['verify']>
}

const authentication: Middleware<AuthenticationRequest> = async (
  req,
  _,
  next
) => {
  const authHeader = req.get('authorization')

  if (!authHeader) {
    next(new Error('unauthorized'))
    return
  }

  const _token = authHeader.split(' ')[1]

  try {
    const decoded = await token.verify(_token)
    req.token = decoded
    next()
  } catch (e) {
    next(new Error('unauthorized'))
  }
}

export default authentication
