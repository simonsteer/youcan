import u from 'updeep'
import * as actions from '../actions/entities'
import { ValueInObject } from '../../global.types'

export type Entity = {
  [id: string]: any
}

export interface Entities {
  [key: string]: Entity
}

const initialState: Entities = {}

const { actionTypes, ...entityActions } = actions
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
