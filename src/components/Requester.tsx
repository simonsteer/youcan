import React, { Component } from 'react'
import { connect } from 'react-redux'
import { request, RequestConfig } from '../actions/request'
import { getFetchingMap, FetchingMap } from '../selectors/fetching'
import { ReduxState } from '../reducers'

type RenderProps<T> = { [key in keyof T]: () => void } & {
  fetching: FetchingMap
}

interface RequesterMap {
  [key: string]: RequestConfig
}

export interface RequesterProps<T extends RequesterMap>
  extends ReturnType<typeof mapStateToProps> {
  requests: T
  shouldDoRequestsOnMount?: boolean
  children: Element | ((renderProps: RenderProps<T>) => React.ReactNode)
}

const mapStateToProps = (state: ReduxState, { requests = {} }) => {
  return {
    fetching: getFetchingMap(state, Object.values(requests)),
    state,
  }
}

const mapDispatchToProps = { request }

class Requester<D extends RequesterMap> extends Component<
  RequesterProps<D> & typeof mapDispatchToProps
> {
  componentDidMount() {
    if (this.props.shouldDoRequestsOnMount) {
      Object.keys(this.props.requests).map(this.doRequest)
    }
  }

  render() {
    const { children } = this.props
    return typeof children === 'function'
      ? children(this.renderProps)
      : children
  }

  private get renderProps(): RenderProps<D> {
    const { requests, fetching } = this.props

    return Object.keys(requests).reduce(
      (methods: any, key) => {
        methods[key] = () => this.doRequest(key)
        return methods
      },
      { fetching }
    )
  }

  private doRequest = (requestKey: keyof RequesterProps<D>['requests']) => {
    const requestConfig = this.props.requests[requestKey]
    if (requestConfig) {
      this.props.request(requestConfig)
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Requester)
