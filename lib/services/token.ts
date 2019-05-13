import jwt from 'jsonwebtoken'
import { IUser } from '../models'

const SECRET = 'secret'

// a service to create a new token
// takes a user, sends back an assigned token

const create = (user: IUser) => {
  const { _id } = user
  const payload = {
    user: {
      id: _id,
    },
  }

  return jwt.sign(payload, SECRET)
}

const verify = (token: string) =>
  jwt.verify(token, SECRET) as { user: { id: number } }

const tokenService = { create, verify }

export default tokenService
