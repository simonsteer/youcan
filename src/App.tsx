import React from 'react'
import { Provider } from 'react-redux'
import store from './reducers/store'
import ComponentEditor from './components/ComponentEditor'
import AccordionMenu from './components/AccordionMenu';

const App = () => (
  <Provider store={store}>
    <ComponentEditor />
  </Provider>
)

export default App
