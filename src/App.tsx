import React from 'react'
import { Provider } from 'react-redux'
import store from './reducers/store'
import ComponentEditor from './components/ComponentEditor'
import AccordionMenu from './components/AccordionMenu';

const App = () => (
  <Provider store={store}>
    {/* <ComponentEditor /> */}
    <div style={{ background: 'black', color: 'red' }}>
      <AccordionMenu title="testing">
        <h1>level 0</h1>
        <AccordionMenu title="testing">
          <h1>level 1</h1>
          <AccordionMenu title="testing">
            <h1>level 2</h1>
            <AccordionMenu title="testing">
              <h1>level 3</h1>
            </AccordionMenu>
          </AccordionMenu>
        </AccordionMenu>
      </AccordionMenu>
      <AccordionMenu title="testing">
        <h1>level 0</h1>
        <AccordionMenu title="testing">
          <h1>level 1</h1>
        </AccordionMenu>
      </AccordionMenu>
      <AccordionMenu title="testing">
        <h1>level 0</h1>
      </AccordionMenu>
    </div>
  </Provider>
)

export default App
