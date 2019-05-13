import React from 'react'
import { Provider } from 'react-redux'
import store from './reducers/store'
import Box from './interface/components/Box'

const App = () => (
  <Provider store={store}>
    <Box shouldFetch resources={['users']} />
  </Provider>
)

export default App
