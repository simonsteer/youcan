import React from 'react'
import { Provider } from 'react-redux'
import store from './reducers/store'
import EditingInterface from './components/EditingInterface'
import View from './components/View'

const App = () => (
  <Provider store={store}>
    <EditingInterface />
    <View style={{ width: '100px', height: '100px', background: 'red' }} />
  </Provider>
)

export default App
