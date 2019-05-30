import React from 'react'
import { Provider } from 'react-redux'
import store from './reducers/store'

const App = () => (
  <Provider store={store}>
    <span>hello world</span>
  </Provider>
)

export default App
