import React from 'react'
import { Provider } from 'react-redux'
import store from './reducers/store'
import { Getter } from './interface/components/Requester'
import ColorPicker from './interface/components/ColorPicker'

const App = () => (
  <Provider store={store}>
    <Getter
      shouldDoRequestOnMount
      resources={['users', 'healthcheck', 'users/5cd66019cd8bc16d19891897']}
    >
      {({ fetching }) => (
        <div>
          {`${fetching.some}`}
          <ColorPicker />
        </div>
      )}
    </Getter>
  </Provider>
)

export default App
