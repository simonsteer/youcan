import { createSelector } from 'reselect'
import { ReduxState } from '../reducers'
import { getEntitiesTable } from './entities'

export const getModuleEntities = (state: ReduxState) =>
  getEntitiesTable(state, 'moduleable')

export const getModules = createSelector(
  getModuleEntities,
  Object.values
)

export const getModulesByName = (state: ReduxState, moduleName: string) =>
  getModules(state).filter(module => module.name === moduleName)

export const getModule = (state: ReduxState, moduleId: string) => {
  const modules = getModules(state)
  return modules.find(modules => modules._id === moduleId)
}
