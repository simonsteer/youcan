import React, { Component } from 'react'
import View from '../View'
import Flex from '../Flex'
import ColorPicker from './ColorPicker'

const MENU_ITEMS = [ColorPicker] as const

class EditingInterface extends Component {
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
  playToggle = () => {
    this.toggleMenu()
    this.timeout = setTimeout(this.playToggle, 2000)
  }

  toggleMenu = () => this.setState({ isMenuOpen: !this.state.isMenuOpen })

  renderMenuItems = () =>
    MENU_ITEMS.map((Item, index) => (
      <Item
        key={`menu-item-${index}`}
        onChange={console.log}
        style={{
          borderTopWidth: '0px',
          borderRightWidth: '0px',
          borderLeftWidth: '0px',
        }}
      />
    ))

  renderButton = () => <View onClick={this.toggleMenu} style={styles.button} />
}

export default EditingInterface

const styles = {
  root: {
    pointerEvents: 'none',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  menu: {
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
