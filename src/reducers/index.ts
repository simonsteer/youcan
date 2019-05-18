import { combineReducers } from 'redux'
import session, { Session } from './session'
import entities, { Entity } from './entities'
import fetching, { Fetching } from './fetching'

export interface ReduxState {
  session: Session
  entities: Entity
  fetching: Fetching
}

const rootReducer = combineReducers({ session, entities, fetching })

export default rootReducer
