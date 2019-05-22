import u from 'updeep'
import { SessionAction } from '../actions/types'

const initialState = {
  token: null,
}

export interface Session {
  token: null | string
}

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
