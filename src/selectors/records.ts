import { createSelector } from 'reselect'
import { ReduxState } from '../reducers'
import { getEntitiesTable } from './entities'

export const getRecordEntities = (state: ReduxState) =>
  getEntitiesTable(state, 'recordable')

export const getRecords = createSelector(
  getRecordEntities,
  Object.values
)

export const getRecordsByName = (state: ReduxState, recordName: string) =>
  getRecords(state).filter(record => record.name === recordName)

export const getRecord = (state: ReduxState, recordId: string) => {
  const records = getRecords(state)
  return records.find(records => records._id === recordId)
}
