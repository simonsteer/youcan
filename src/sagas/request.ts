import { takeEvery, put, select, call } from 'redux-saga/effects'
import axios, { AxiosRequestConfig } from 'axios'
import get from 'lodash/get'
import {
  RequestResultAction,
  RequestAction,
  requestSuccess,
  requestFailure,
} from '../actions/request'
import { getSessionToken } from '../selectors/session'
import { entitiesSet } from '../actions/entities'
import { normalize } from 'normalizr'
import normalizeSchema from '../reducers/schema'
import { sessionSetToken } from '../actions/session'

export const request = function*(action: ReturnType<RequestAction>) {
  const {
    payload: { resource, data, method },
  } = action

  let resultAction: RequestResultAction = requestFailure(
    resource,
    new Error('An unknown error occurred')
  )

  const token = yield select(getSessionToken)
  try {
    const response = yield axios.request({
      headers: { Authorization: `Bearer ${token}` },
      url: `/${resource}`,
      method,
      data,
    } as AxiosRequestConfig)

    resultAction = requestSuccess(resource, response.data)
  } catch (error) {
    resultAction = requestFailure(resource, error)
  }

  yield put(resultAction)

  if (
    resultAction.type === 'REQUEST_SUCCESS' &&
    typeof resultAction.payload === 'object'
  ) {
    const normalized = yield call(
      normalize,
      resultAction.payload.data,
      normalizeSchema
    )
    yield put(entitiesSet(normalized))

    const token = get(resultAction, 'payload.data.token')
    if (token) {
      yield put(sessionSetToken(token))
    }
  }
  console.log(resultAction)
  return resultAction
}

const requestSaga = function*() {
  return yield takeEvery('REQUEST', request)
}

export default requestSaga
