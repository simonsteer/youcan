import React, { Component, SyntheticEvent } from 'react'
import { connect } from 'react-redux'
import omit from 'lodash/omit'
import { CustomComponent } from './types'
import { COMPONENT_TYPES } from './constants'
import { selectComponent, deselectComponent } from '../../actions/interaction'
import { getSelectedComponent } from '../../selectors/interaction'
import { ReduxState } from '../../reducers'

interface ComponentRendererProps {
  component: CustomComponent
  isEditMode?: boolean
}

const mapStateToProps = (state: ReduxState) => ({
  selectedComponent: getSelectedComponent(state),
})

const mapDispatchToProps = {
  selectComponent,
  deselectComponent,
}

type Props = ComponentRendererProps &
  typeof mapDispatchToProps &
  ReturnType<typeof mapStateToProps>

class ComponentRenderer extends Component<Props> {
  render() {
    const {
      props: {
        component: { type, children, style },
        isEditMode = false,
        selectComponent,
        deselectComponent,
        selectedComponent,
      },
    } = this

    const renderedProps = {
      onClick: isEditMode ? this.handleClick : null,
      style: [style, isEditMode ? this.editingStyle : {}],
    }

    const reduxDependencies = {
      selectComponent,
      deselectComponent,
      selectedComponent,
    }

    const Component = COMPONENT_TYPES[type]

    return (
      <Component {...renderedProps}>
        {typeof children === 'string' ? (
          children
        ) : (
          <ComponentRenderer
            {...reduxDependencies}
            isEditMode={isEditMode}
            component={children}
          />
        )}
      </Component>
    )
  }

  key = new Date().getTime()

  get editingStyle() {
    const { selectedComponent } = this.props

    const isThisComponentSelected = selectedComponent.key === this.key
    const isAnotherComponentSelected =
      !!selectedComponent.key && !isThisComponentSelected

    return {
      _before: {
        cursor: 'pointer',
        content: '""',
        zIndex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        border: isThisComponentSelected ? '2px dotted rgba(0,0,0,0.5)' : 'none',
        _hover: {
          border: isAnotherComponentSelected
            ? 'none'
            : '2px dotted rgba(0,0,0,0.5)',
        },
      },
    }
  }

  handleClick = (event: SyntheticEvent) => {
    event.stopPropagation()
    const {
      selectComponent,
      deselectComponent,
      selectedComponent,
      component,
    } = this.props

    if (selectedComponent.key === this.key) {
      deselectComponent()
    } else {
      selectComponent(this.key, component)
      const originalStyle = omit(component.style, '_before')
      console.log({ originalStyle })
    }
  }
}

const styles = {
  hover: {
    cursor: 'pointer',
    _hover: {
      _after: {
        content: '""',
        position: 'absolute',
        pointerEvents: 'none',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        border: '2px dashed red',
      },
    },
  },
  selected: {
    _after: {
      content: '""',
      position: 'absolute',
      pointerEvents: 'none',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      border: '2px dashed red',
    },
  },
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComponentRenderer)
