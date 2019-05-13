import { combineReducers } from 'redux'
import session, { Session } from './session'
import entities, { Entities } from './entities'

export interface ReduxState {
  session: Session
  entities: Entities
}

const rootReducer = combineReducers({ session, entities })

export default rootReducer
