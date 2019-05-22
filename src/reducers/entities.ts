import u from 'updeep'
import { EntitiesAction } from '../actions/types'
import { entityShape } from './schema'

interface EntityShape {
  [id: string]: any
}

export type Entities = { [key in keyof typeof entityShape]: EntityShape }

const initialState: Entities = {
  user: {},
  application: {},
  moduleable: {},
  module: {},
}

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
