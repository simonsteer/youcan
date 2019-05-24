import React from 'react'
import { Provider } from 'react-redux'
import store from './reducers/store'
import EditingInterface from './components/EditingInterface'
import ComponentRenderer from './components/ComponentRenderer'
import {
  MOCK_CUSTOM_COMPONENT,
  NESTED,
} from './components/ComponentRenderer/constants'

const App = () => (
  <Provider store={store}>
    <ComponentRenderer isEditMode component={NESTED} />
    <EditingInterface />
  </Provider>
)

export default App
