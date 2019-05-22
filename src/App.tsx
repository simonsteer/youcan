import React from 'react'
import { Provider } from 'react-redux'
import store from './reducers/store'
import EditingInterface from './components/EditingInterface'
import Requester from './components/Requester'

const App = () => (
  <Provider store={store}>
    <EditingInterface />
    <Requester
      requests={{
        login: {
          resource: 'login',
          data: { email: 'susan@earnwithdrop.com', password: 'password' },
          method: 'post',
        },
      }}
    >
      {props => <button onClick={() => props.doRequest('login')}>Login</button>}
    </Requester>
  </Provider>
)

export default App
