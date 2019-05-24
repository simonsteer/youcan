import React, { Component } from 'react'
import { connect } from 'react-redux'
import { request, RequestConfig } from '../actions/request'
import { getFetchingMap } from '../selectors/fetching'
import { ReduxState } from '../reducers'

type FetchingMap = { [key: string]: boolean; some: boolean; every: boolean }

export interface RequesterProps {
  requests: { [key: string]: RequestConfig }
  shouldDoRequestsOnMount?: boolean
  children:
    | Element
    | ((renderProps: {
        fetching: FetchingMap
        doRequest: (requestKey: string) => void
      }) => React.ReactNode)
}

const mapStateToProps = (
  state: ReduxState,
  { requests = {} }: RequesterProps
) => {
  return {
    fetching: getFetchingMap(state, Object.values(requests)),
    state,
  }
}

const mapDispatchToProps = { request }

type Props = RequesterProps &
  ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps

class Requester extends Component<Props> {
  componentDidMount() {
    if (this.props.shouldDoRequestsOnMount) {
      Object.keys(this.props.requests).map(this.doRequest)
    }
  }

  render() {
    console.log(this.props.state)
    const { children, fetching } = this.props

    const renderProps = {
      doRequest: this.doRequest,
      fetching,
    }

    return typeof children === 'function' ? children(renderProps) : children
  }

  doRequest = (requestKey: string) => {
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
