import u from 'updeep'
import omitBy from 'lodash/omitBy'
import * as actions from '../actions/request'
import { ValueInObject } from '../../global.types'

export const cleanResourceString = (resource: string) => resource.split('/')[0]

export const RESOURCES = {
  users: 'users',
  healthcheck: 'healthcheck',
  login: 'login',
  signup: 'signup',
}

export type Resource = keyof typeof RESOURCES

const RESOURCE_KEYS = Object.keys(RESOURCES) as Resource[]

type ResourceMap = { [key in keyof typeof RESOURCES]: boolean }

const resourceMap = RESOURCE_KEYS.reduce(
  (map, key: Resource) => {
    map[key] = false
    return map
  },
  {} as { [key: string]: boolean }
) as ResourceMap

export interface Fetching {
  resource: ResourceMap
}

const { actionTypes, ...fetchingActions } = actions

const initialState: Fetching = {
  resource: resourceMap,
}

type EntityAction = ReturnType<ValueInObject<typeof fetchingActions>>

const fetching = (state = initialState, action: EntityAction) => {
  switch (action.type) {
    case 'REQUEST': {
      const {
        payload: { resource },
      } = action

      const resourceString = cleanResourceString(resource)

      const updates = {
        resource: omitBy(
          {
            [resourceString]: resourceString in state.resource,
          },
          !Boolean
        ),
      }

      return u(updates, state)
    }
    case 'REQUEST_FAILURE':
    case 'REQUEST_SUCCESS': {
      const {
        payload: { resource },
      } = action

      const resourceString = cleanResourceString(resource)

      const updates = {
        resource: omitBy(
          {
            [resourceString]: !(resourceString in state.resource),
          },
          Boolean
        ),
      }

      return u(updates, state)
    }
    default:
      return state
  }
}

export default fetching
