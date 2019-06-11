import React, { useState } from 'react'
import { Provider } from 'react-redux'
import store from './reducers/store'
import ComponentEditor from './components/ComponentEditor'
import AccordionMenu from './components/AccordionMenu'
import { CSSPropertyChanges } from './components/ComponentEditor/ComponentEditor'

const App = () => {
  const [componentStyle, setComponentStyle] = useState({})

  const handleChange = (style: CSSPropertyChanges) => {
    setComponentStyle({ ...componentStyle, ...style })
  }

  return (
    <Provider store={store}>
      <ComponentEditor onChange={handleChange} />
      <div style={componentStyle} />
    </Provider>
  )
}

export default App
