import u from 'updeep'
import { EntitiesAction } from '../actions/types'

export type Entity = {
  [id: string]: any
}

export interface Entities {
  [key: string]: Entity
}

const initialState: Entities = {}

const session = (state = initialState, action: EntitiesAction) => {
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
