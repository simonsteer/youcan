import { Entity } from '../reducers/entities'

export const actionTypes = {
  ENTITIES_SET: 'ENTITIES_SET',
} as const

export const entitiesSet = (entities: Entity) => ({
  type: actionTypes.ENTITIES_SET,
  payload: entities,
})
