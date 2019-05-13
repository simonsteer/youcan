import React, { Component } from 'react'
import { connect } from 'react-redux'
import { request } from '../../actions/request'
import { ReduxState } from '../../reducers'

type OwnProps = {
  resources?: string[]
  shouldFetch?: boolean
}

const mapStateToProps = (state: ReduxState) => state

const mapDispatchToProps = { request }

type Props = OwnProps &
  ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps

interface State {
  fetching: boolean
}

class Box extends Component<Props, State> {
  state = {
    fetching: false,
  }

  componentDidMount() {
    if (this.props.shouldFetch) {
      this.fetchResources()
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (!this.props.shouldFetch && nextProps.shouldFetch && !this.hasFetched) {
      this.fetchResources()
    }
  }

  render() {
    const { children } = this.props

    const renderProps = {
      fetchResources: this.fetchResources,
      fetching: true,
    }

    const renderedChildren =
      typeof children === 'function' ? children(renderProps) : children

    return <div>{renderedChildren}</div>
  }

  hasFetched = false

  fetchResources = () => {
    const { resources } = this.props
    if (!resources) {
      return
    }

    resources.forEach(resource => {
      this.props.request({ resource, method: 'get' })
    })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Box)
