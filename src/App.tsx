import React from 'react'
import { Provider } from 'react-redux'
import store from './reducers/store'
import EditingInterface from './components/EditingInterface'
import Draggable from './components/EditingInterface/Draggable'
import ColorPicker from './components/ColorPicker'

const App = () => (
  <Provider store={store}>
    <EditingInterface>
      <Draggable>
        <ColorPicker onChange={console.log} />
      </Draggable>
    </EditingInterface>
  </Provider>
)

export default App
