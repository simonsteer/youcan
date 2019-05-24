import { ReduxState } from '../reducers'
import { Resource } from '../reducers/fetching'
import { RequestConfig } from '../actions/request'

type FetchingMap = { [key: string]: boolean; some: boolean; every: boolean }

export const getIsResourceFetching = (state: ReduxState, resource: Resource) =>
  !!state.fetching.resource[resource]

export const getFetchingMap = (state: ReduxState, requests: RequestConfig[]) =>
  requests.reduce(
    (fetchingMap, request, index) => {
      fetchingMap[request.resource] = getIsResourceFetching(
        state,
        request.resource
      )
      if (index === requests.length - 1) {
        const fetchingResources = Object.values(fetchingMap)
        fetchingMap.some = fetchingResources.some(Boolean)
        fetchingMap.every = fetchingResources.every(Boolean)
      }
      return fetchingMap
    },
    {} as FetchingMap
  )
