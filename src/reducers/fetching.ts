import u from 'updeep'
import * as actions from '../actions/request'
import { RequestAction } from '../actions/types'

export type Resource = string
type ResourceMap = { [key: string]: boolean }

export interface Fetching {
  resource: ResourceMap
}

const initialState: Fetching = {
  resource: {},
}

const fetching = (state = initialState, action: RequestAction) => {
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
