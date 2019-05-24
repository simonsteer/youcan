import { createSelector } from 'reselect'
import { ReduxState } from '../reducers'
import { getEntitiesTable } from './entities'

export const getModuleableEntities = (state: ReduxState) =>
  getEntitiesTable(state, 'moduleable')

export const getModuleables = createSelector(
  getModuleableEntities,
  Object.values
)

export const getModuleable = (state: ReduxState, moduleableId: string) => {
  const moduleables = getModuleables(state)
  return moduleables.find(moduleable => moduleable._id === moduleableId)
}
