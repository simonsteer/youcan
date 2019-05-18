import { ReduxState } from '../reducers'
import { Resource } from '../reducers/fetching'

type FetchingMap = { [key: string]: boolean; some: boolean; every: boolean }

export const getIsResourceFetching = (state: ReduxState, resource: Resource) =>
  !!state.fetching.resource[resource]

export const getFetchingMap = (state: ReduxState, resources: string[]) =>
  resources.reduce(
    (fetchingMap, resource, index) => {
      fetchingMap[resource] = getIsResourceFetching(state, resource)
      if (index === resources.length - 1) {
        const fetchingResources = Object.values(fetchingMap)
        fetchingMap.some = fetchingResources.some(Boolean)
        fetchingMap.every = fetchingResources.every(Boolean)
      }
      return fetchingMap
    },
    {} as FetchingMap
  )
