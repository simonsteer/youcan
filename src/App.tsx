import React, { useState } from 'react'
import { Provider } from 'react-redux'
import store from './reducers/store'
import CSSEditor from './components/ComponentEditor/CSSEditor'

const App = () => {
  const [componentStyle, setComponentStyle] = useState({})

  return (
    <Provider store={store}>
      <CSSEditor
        onChange={style => {
          setComponentStyle({ ...componentStyle, ...style })
        }}
      />
      <div style={componentStyle} />
    </Provider>
  )
}

export default App
