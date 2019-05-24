import { combineReducers } from 'redux'
import session, { Session } from './session'
import entities, { Entities } from './entities'
import fetching, { Fetching } from './fetching'
import interaction, { Interaction } from './interaction'

export interface ReduxState {
  session: Session
  entities: Entities
  fetching: Fetching
  interaction: Interaction
}

const rootReducer = combineReducers({
  session,
  entities,
  fetching,
  interaction,
})

export default rootReducer
