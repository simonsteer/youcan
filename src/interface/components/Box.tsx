import React, { Component } from 'react'
import { connect } from 'react-redux'
import { request } from '../../actions/request'
import { getIsResourceFetching } from '../../selectors/fetching'
import { ReduxState } from '../../reducers'
import {
  RESOURCES,
  cleanResourceString,
  Resource,
} from '../../reducers/fetching'

type FetchingMap = { [key: string]: boolean; some: boolean; every: boolean }

type OwnProps = {
  resources?: string[]
  shouldFetch?: boolean
  children: Element | ((fetchingMap: FetchingMap) => Element)
}

const mapStateToProps = (state: ReduxState, { resources = [] }: OwnProps) => ({
  fetching: resources.reduce(
    (acc, res, index) => {
      const cleanedString = cleanResourceString(res)
      if (cleanedString in RESOURCES) {
        acc[res] = getIsResourceFetching(state, cleanedString as Resource)
      }
      if (index === resources.length - 1) {
        const values = Object.values(acc)
        acc.some = values.some(Boolean)
        acc.every = values.every(Boolean)
      }
      return acc
    },
    {} as FetchingMap
  ),
})

const mapDispatchToProps = { request }

type Props = OwnProps &
  ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps

class Box extends Component<Props> {
  componentDidMount() {
    if (this.props.shouldFetch) {
      this.fetchResources()
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (!this.props.shouldFetch && nextProps.shouldFetch) {
      this.fetchResources()
    }
  }

  render() {
    const { children, fetching } = this.props

    const renderedChildren =
      typeof children === 'function' ? children(fetching) : children

    return <div>{renderedChildren}</div>
  }

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
