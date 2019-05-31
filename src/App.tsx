import React from 'react'
import { Provider } from 'react-redux'
import store from './reducers/store'
import { Toggle, NumericInput, DropdownSelect } from './components/Inputs'
import MenuItem from './components/ComponentEditor/MenuItem'
import Flex from './components/Flex'

const App = () => (
  <Provider store={store}>
    {Array(5)
      .fill(undefined)
      .map(() => (
        <MenuItem title="Testing">
          <Toggle onChange={console.log} />
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
        </MenuItem>
      ))}
  </Provider>
)

export default App
