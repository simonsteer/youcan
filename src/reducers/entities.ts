import u from 'updeep'
import * as actions from '../actions/entities'
import { ValueInObject } from '../../global.types'

const { actionTypes, ...entityActions } = actions

const initialState: Entities = {
  user: {},
}

export interface Entities {
  user: object
}

type EntityAction = ReturnType<ValueInObject<typeof entityActions>>

const session = (state = initialState, action: EntityAction) => {
  switch (action.type) {
    case 'ENTITIES_SET': {
      const { entities } = action.payload
      return u(entities, state)
    }
    default:
      return state
  }
}

export default session
