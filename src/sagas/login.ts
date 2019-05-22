import { takeLatest } from 'redux-saga/effects'
import { sessionSetToken } from '../actions/session'
import { request } from './request'
import { userGetCurrent } from '../actions/user'

const loginSaga = function*() {
  yield takeLatest('SESSION_SET_TOKEN', function*(
    action: ReturnType<typeof sessionSetToken>
  ) {
    yield request(userGetCurrent())
  })
}

export default loginSaga
