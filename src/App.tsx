import React from 'react'
import { Provider } from 'react-redux'
import store from './reducers/store'
import { NumericInput, DropdownSelect } from './components/Inputs'

const App = () => (
  <Provider store={store}>
    <NumericInput onChange={console.log} />
    <DropdownSelect
      options={[
        { value: 'px', label: 'pixels' },
        { value: 'vw', label: '% window width' },
        { value: 'vh', label: '% window height' },
        { value: '%', label: '% container width' },
      ]}
      defaultValue="%"
      onChange={console.log}
    />
  </Provider>
)

export default App
