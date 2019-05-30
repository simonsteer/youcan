import u from 'updeep'
import { Action } from '../actions/types'
import { entityShape } from './schema'

interface EntityShape {
  [id: string]: any
}

export type Entities = { [key in keyof typeof entityShape]: EntityShape }

const initialState: Entities = {
  user: {},
  application: {},
  recordable: {},
  record: {},
}

const session = (state = initialState, action: Action) => {
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
