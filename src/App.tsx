import React from 'react'
import { Provider } from 'react-redux'
import flatten from 'lodash/flatten'
import store from './reducers/store'
import ComponentRenderer from './components/ComponentRenderer'
import {
  NESTED,
  CUSTOM_COMPONENT_PROPERTIES,
} from './components/ComponentRenderer/constants'
import StyleEditor from './components/StyleEditor/StyleEditor'

const App = () => {
  const editors = flatten(
    CUSTOM_COMPONENT_PROPERTIES.map(({ properties }) =>
      Object.keys(properties).map(key => ({
        key,
        value: properties[key],
      }))
    )
  )

  return (
    <Provider store={store}>
      <ComponentRenderer isEditMode component={NESTED} />
      <StyleEditor onChange={console.log} />
    </Provider>
  )
}

export default App
