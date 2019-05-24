import { createSelector } from 'reselect'
import { ReduxState } from '../reducers'
import { Entity } from '../reducers/schema'
import get from 'lodash/get'

export const getEntities = (state: ReduxState) => state.entities

export const getEntitiesTable = (state: ReduxState, entity: Entity) =>
  get(getEntities(state), `${entity}`) || {}
