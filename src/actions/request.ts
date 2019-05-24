import { ValueInObject } from '../../global.types'

const requestTypes = {
  get: 'get',
  post: 'post',
  delete: 'delete',
  put: 'put',
  patch: 'patch',
} as const

type RequestMethod = ValueInObject<typeof requestTypes>

export interface RequestConfig {
  resource: string
  method: RequestMethod
  data?: any
}

export const request = ({ resource, method, data }: RequestConfig) =>
  ({
    type: 'REQUEST',
    payload: { resource, method, data },
  } as const)

export const requestSuccess = (resource: string, data: any) =>
  ({
    type: 'REQUEST_SUCCESS',
    payload: { resource, data },
  } as const)

export const requestFailure = (resource: string, error: Error) =>
  ({
    type: 'REQUEST_FAILURE',
    payload: { resource, error },
  } as const)
