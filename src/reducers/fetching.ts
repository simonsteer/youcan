import u from 'updeep'
import * as actions from '../actions/request'
import { ValueInObject } from '../../global.types'

export type Resource = string
type ResourceMap = { [key: string]: boolean }

export interface Fetching {
  resource: ResourceMap
}

const initialState: Fetching = {
  resource: {},
}

const { actionTypes, ...fetchingActions } = actions
type EntityAction = ReturnType<ValueInObject<typeof fetchingActions>>

const fetching = (state = initialState, action: EntityAction) => {
  switch (action.type) {
    case 'REQUEST': {
      const {
        payload: { resource },
      } = action
      return u({ resource: { [resource]: true } }, state)
    }
    case 'REQUEST_FAILURE':
    case 'REQUEST_SUCCESS': {
      const {
        payload: { resource },
      } = action
      return u(
        {
          resource: u.omitBy((value: boolean, key: string) => key === resource),
        },
        state
      )
    }
    default:
      return state
  }
}

export default fetching
