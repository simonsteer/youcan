import { UserSchema } from '../../lib/models'
import { request } from './request'

export const userLogin = ({ email, password }: UserSchema) =>
  request({
    resource: 'users/login',
    method: 'post',
    data: { email, password },
  })

export const userCreate = ({ email, password, username }: UserSchema) =>
  request({
    resource: 'users',
    method: 'post',
    data: { email, password, username },
  })

export const userGetCurrent = () =>
  request({
    resource: 'users/current',
    method: 'get',
  })
