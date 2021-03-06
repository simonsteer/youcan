import { takeLatest, put } from 'redux-saga/effects'
import { sessionSetToken } from '../actions/session'
import { userGetCurrent } from '../actions/user'

const loginSaga = function*() {
  yield takeLatest('SESSION_SET_TOKEN', function*(
    action: ReturnType<typeof sessionSetToken>
  ) {
    yield put(userGetCurrent())
  })
}

export default loginSaga
