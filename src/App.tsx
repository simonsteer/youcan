import React from 'react'
import { Provider } from 'react-redux'
import store from './reducers/store'
import { Toggle, NumericInput, DropdownSelect } from './components/Inputs'
import ColorPicker from './components/Inputs/ColorPicker';
import Expandable from './components/Expandable'

const App = () => (
  <Provider store={store}>
    <Expandable closedHeight={48}>
      {({ setIsOpen, isOpen }) =>
        <div>
          <h3 style={{ height: '48px' }} onClick={() => setIsOpen(!isOpen)}>test</h3>
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
          <ColorPicker initialValue="#ffffff" onChange={console.log} />
        </div>}
    </Expandable>
  </Provider>
)

export default App
