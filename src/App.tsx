import React from 'react'
import { Provider } from 'react-redux'
import store from './reducers/store'
import ComponentEditor from './components/ComponentEditor/ComponentEditor'

const App = () => (
  <Provider store={store}>
    <ComponentEditor />
  </Provider>
)

export default App
