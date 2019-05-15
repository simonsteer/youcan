import { ReduxState } from '../reducers'
import { Resource } from '../reducers/fetching'

export const getIsResourceFetching = (state: ReduxState, resource: Resource) =>
  state.fetching.resource[resource]
