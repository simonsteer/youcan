import { schema } from 'normalizr'

const user = new schema.Entity('user', {}, { idAttribute: '_id' })

const shape: { [key: string]: schema.Entity | schema.Array } = { user }

const normalizeSchema: typeof shape = {}
const resources = Object.keys(shape)
resources.forEach(resourceKey => {
  const resource = shape[resourceKey]
  normalizeSchema[resourceKey] = resource
  normalizeSchema[`${resourceKey}s`] = new schema.Array(resource)
})

export default normalizeSchema
