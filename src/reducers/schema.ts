import { schema } from 'normalizr'

export const entityShape = {
  user: new schema.Entity('user', {}, { idAttribute: '_id' }),
  application: new schema.Entity('application', {}, { idAttribute: '_id' }),
  recordable: new schema.Entity('recordable', {}, { idAttribute: '_id' }),
  record: new schema.Entity('record', {}, { idAttribute: '_id' }),
} as const

export type Entity = keyof typeof entityShape

const entityMap = Object.keys(entityShape) as (keyof typeof entityShape)[]

type Pluralized = { [key: string]: schema.Array }

const pluralizedShape: Pluralized = entityMap.reduce(
  (pluralized: Pluralized, entity) => {
    pluralized[`${entity}s`] = new schema.Array(entityShape[entity])
    return pluralized
  },
  {}
)

const normalizeSchema = {
  ...entityShape,
  ...pluralizedShape,
}

export default normalizeSchema
