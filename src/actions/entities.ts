import { Entities } from '../reducers/entities'

export const entitiesSet = (normalized: { entities: Entities }) =>
  ({
    type: 'ENTITIES_SET',
    payload: normalized,
  } as const)
