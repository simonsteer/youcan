import { combineReducers } from 'redux'
import session, { Session } from './session'
import entities, { Entities } from './entities'
import fetching, { Fetching } from './fetching'

export interface ReduxState {
  session: Session
  entities: Entities
  fetching: Fetching
}

const rootReducer = combineReducers({ session, entities, fetching })

export default rootReducer
