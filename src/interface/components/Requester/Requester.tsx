import React, { Component } from 'react'
import { connect } from 'react-redux'
import { request } from '../../../actions/request'
import { getFetchingMap } from '../../../selectors/fetching'
import { ReduxState } from '../../../reducers'

type FetchingMap = { [key: string]: boolean; some: boolean; every: boolean }

type Method = 'get' | 'put' | 'post' | 'patch' | 'delete'

type Resource =
  | string
  | {
      resource: string
      method: Method
      data?: any
    }

export interface RequesterProps {
  method: Method
  resources?: Resource[]
  shouldDoRequestOnMount?: boolean
  children:
    | Element
    | ((renderProps: {
        fetching: FetchingMap
        doRequest: () => void
      }) => React.ReactNode)
}

const mapStateToProps = (
  state: ReduxState,
  { resources = [] }: RequesterProps
) => {
  const resourceList = resources.map(resource =>
    typeof resource === 'string' ? resource : resource.resource
  )
  return { fetching: getFetchingMap(state, resourceList) }
}

const mapDispatchToProps = { request }

type Props = RequesterProps &
  ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps

class Requester extends Component<Props> {
  componentDidMount() {
    if (this.props.shouldDoRequestOnMount) {
      this.doRequest()
    }
  }

  render() {
    const { children, fetching } = this.props

    const renderProps = {
      doRequest: this.doRequest,
      fetching,
    }

    return typeof children === 'function' ? children(renderProps) : children
  }

  doRequest = () => {
    const { resources, method, request } = this.props
    if (!resources) {
      return
    }

    resources.forEach(resource =>
      typeof resource === 'string'
        ? request({ resource, method })
        : request(resource)
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Requester)
