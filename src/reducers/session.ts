import u from 'updeep'
import * as actions from '../actions/session'
import { ValueInObject } from '../../global.types'
const { actionTypes, ...sessionActions } = actions

const initialState = {
  token: null,
}

export interface Session {
  token: null | string
}

type SessionAction = ReturnType<ValueInObject<typeof sessionActions>>

const session = (state = initialState, action: SessionAction) => {
  switch (action.type) {
    case 'SESSION_SET_TOKEN': {
      const { token } = action.payload
      return u({ token }, state)
    }
    default:
      return state
  }
}

export default session
