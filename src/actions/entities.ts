import { Entities } from '../reducers/entities'

export const actionTypes = {
  ENTITIES_SET: 'ENTITIES_SET',
} as const

export const entitiesSet = (normalized: { entities: Entities }) => ({
  type: actionTypes.ENTITIES_SET,
  payload: normalized,
})
