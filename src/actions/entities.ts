export const actionTypes = {
  ENTITIES_SET: 'ENTITIES_SET',
} as const

export const entitiesSet = (entities: any) => ({
  type: actionTypes.ENTITIES_SET,
  payload: entities,
})
