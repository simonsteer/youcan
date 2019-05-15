import { ValueInObject } from '../../global.types'

export const actionTypes = {
  REQUEST: 'REQUEST',
  REQUEST_SUCCESS: 'REQUEST_SUCCESS',
  REQUEST_FAILURE: 'REQUEST_FAILURE',
} as const

const requestTypes = {
  get: 'get',
  post: 'post',
  delete: 'delete',
  put: 'put',
  patch: 'patch',
} as const

type RequestMethod = ValueInObject<typeof requestTypes>

export type RequestAction = (config: {
  resource: string
  method: RequestMethod
  data?: any
}) => {
  type: typeof actionTypes['REQUEST']
  payload: {
    resource: string
    method: RequestMethod
    data: any
  }
}

export type RequestResultAction =
  | {
      type: typeof actionTypes['REQUEST_SUCCESS']
      payload: { data: any; resource: string }
    }
  | {
      type: typeof actionTypes['REQUEST_FAILURE']
      payload: { error: Error; resource: string }
    }

export const request: RequestAction = ({ resource, method, data }) => ({
  type: actionTypes.REQUEST,
  payload: { resource, method, data },
})

export const requestSuccess = (
  resource: string,
  data: any
): RequestResultAction => ({
  type: actionTypes.REQUEST_SUCCESS,
  payload: { resource, data },
})

export const requestFailure = (
  resource: string,
  error: Error
): RequestResultAction => ({
  type: actionTypes.REQUEST_FAILURE,
  payload: { resource, error },
})
