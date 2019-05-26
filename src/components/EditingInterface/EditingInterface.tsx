import React, { Component } from 'react'
import { connect } from 'react-redux'
import View from '../View'
import Flex from '../Flex'
import ColorPicker from './ColorPicker'
import { ReduxState } from '../../reducers'
import { getSelectedComponent } from '../../selectors/interaction'

const MENU_ITEMS = [ColorPicker] as const

const mapStateToProps = (state: ReduxState) => ({
  selectedComponent: getSelectedComponent(state),
})

type Props = ReturnType<typeof mapStateToProps>

class EditingInterface extends Component<Props> {
  state = { isMenuOpen: true }

  render() {
    return (
      <Flex justify="flex-end" style={styles.root}>
        <Flex
          column
          style={[
            styles.menu,
            this.state.isMenuOpen ? {} : { transform: 'translateX(241px)' },
          ]}
        >
          {this.renderButton()}
          {this.renderMenuItems()}
        </Flex>
      </Flex>
    )
  }

  timeout: any = 0

  toggleMenu = () => this.setState({ isMenuOpen: !this.state.isMenuOpen })

  renderMenuItems = () =>
    MENU_ITEMS.map((Item, index) => (
      <Item key={`menu-item-${index}`} name={`item-${index}`} />
    ))

  renderButton = () => <View onClick={this.toggleMenu} style={styles.button} />
}

export default connect(mapStateToProps)(EditingInterface)

const styles = {
  root: {
    zIndex: 9999,
    pointerEvents: 'none',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  menu: {
    background: 'white',
    pointerEvents: 'all',
    borderLeft: '1px solid #a3a3a3',
    width: '240px',
    height: '100vh',
    transition: 'transform 0.3s',
  },
  button: {
    cursor: 'pointer',
    background: 'rgb(244, 244, 244)',
    border: '1px solid #a3a3a3',
    borderRightWidth: '0px',
    borderTopWidth: '0px',
    position: 'absolute',
    right: '240px',
    top: '0px',
    width: '32px',
    height: '32px',
    transition: 'background-color 0.2s',
    _hover: { background: 'rgb(236, 236, 236)' },
  },
}
