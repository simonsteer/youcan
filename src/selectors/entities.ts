import { createSelector } from 'reselect'
import { ReduxState } from '../reducers'
import get from 'lodash/get'

export const getEntities = (state: ReduxState) => state.entities

export const getEntityTable = (state: ReduxState, entity: string) =>
  get(getEntities(state), `${entity}`) || {}

export const createGetEntityById = (entity: string, id: string) =>
  createSelector(
    getEntities,
    entities => get(entities, `${entity}.${id}`)
  )
