import { createSelector } from 'reselect'
import { ReduxState } from '../reducers'
import { getEntitiesTable } from './entities'

export const getRecordableEntities = (state: ReduxState) =>
  getEntitiesTable(state, 'recordable')

export const getRecordables = createSelector(
  getRecordableEntities,
  Object.values
)

export const getRecordable = (state: ReduxState, recordableId: string) => {
  const recordables = getRecordables(state)
  return recordables.find(recordable => recordable._id === recordableId)
}
