import { takeEvery, put, select, call } from 'redux-saga/effects'
import axios, { AxiosRequestConfig } from 'axios'
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

const requestSaga = function*() {
  return yield takeEvery(
    'REQUEST' as ReturnType<RequestAction>['type'],
    function*(action: ReturnType<RequestAction>) {
      const {
        payload: { resource, data, method },
      } = action

      let resultAction: RequestResultAction = requestFailure(
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

        resultAction = requestSuccess(response.data)
      } catch (error) {
        resultAction = requestFailure(error)
      }

      yield put(resultAction)

      if (
        resultAction.type === 'REQUEST_SUCCESS' &&
        typeof resultAction.payload === 'object'
      ) {
        const normalized = yield call(
          normalize,
          resultAction.payload,
          normalizeSchema
        )
        yield put(entitiesSet(normalized))
      }
    }
  )
}

export default requestSaga
