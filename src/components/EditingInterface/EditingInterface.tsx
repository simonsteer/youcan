import React, { Component } from 'react'
import View from '../View'

class EditingInterface extends Component {
  render() {
    return <View style={styles.root}>{this.props.children}</View>
  }
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
}
