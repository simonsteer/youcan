import { takeEvery, put, select, call } from 'redux-saga/effects'
import axios, { AxiosRequestConfig } from 'axios'
import get from 'lodash/get'
import { request, requestSuccess, requestFailure } from '../actions/request'
import { getSessionToken } from '../selectors/session'
import { entitiesSet } from '../actions/entities'
import { normalize } from 'normalizr'
import normalizeSchema from '../reducers/schema'
import { sessionSetToken } from '../actions/session'

const requestSaga = function*() {
  return yield takeEvery('REQUEST', function*(
    action: ReturnType<typeof request>
  ) {
    const {
      payload: { resource, data, method },
    } = action

    let resultAction = requestFailure(
      resource,
      new Error('An unknown error has occurred')
    ) as any

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
    return resultAction
  })
}

export default requestSaga
