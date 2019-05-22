import { all } from 'redux-saga/effects'
import request from './request'
import login from './login'

export default function* rootSaga() {
  yield all([request(), login()])
}
