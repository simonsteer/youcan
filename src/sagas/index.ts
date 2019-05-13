import { all } from 'redux-saga/effects'
import request from './request'

export default function* rootSaga() {
  yield all([request()])
}
