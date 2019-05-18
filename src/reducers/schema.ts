import { schema } from 'normalizr'

const user = new schema.Entity('user', {}, { idAttribute: '_id' })

const entityShape: { [key: string]: schema.Entity } = { user }
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
