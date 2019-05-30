import React from 'react'
import { Provider } from 'react-redux'
import store from './reducers/store'
import { NumericInput } from './components/Inputs'

const App = () => (
  <Provider store={store}>
    <NumericInput onChange={console.log} />
  </Provider>
)

export default App
