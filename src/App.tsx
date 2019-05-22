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
          method: 'post',
          data: { email: 'susan@earnwithdrop.com', password: 'password' },
        },
        getApplications: {
          resource: 'applications',
          method: 'get',
        },
        getModuleables: {
          resource: 'applications/5ce4d65b7eb8583ed9563658/moduleables',
          method: 'get',
        },
        createApplication: {
          resource: 'applications',
          method: 'post',
          data: { name: 'My First App' },
        },
        createModuleable: {
          resource: 'applications/5ce4d65b7eb8583ed9563658/moduleables',
          method: 'post',
          data: MOCK_MODULEABLE,
        },
        createModule_1: {
          resource: 'applications/5ce4d65b7eb8583ed9563658/modules/User',
          method: 'post',
          data: MOCK_MODULE_1,
        },
        createModule_2: {
          resource: 'applications/5ce4d65b7eb8583ed9563658/modules/User',
          method: 'post',
          data: MOCK_MODULE_2,
        },
      }}
    >
      {props => (
        <div>
          <button onClick={() => props.doRequest('login')}>login</button>
          <button onClick={() => props.doRequest('getApplications')}>
            get applications
          </button>
          <button onClick={() => props.doRequest('getModuleables')}>
            get moduleables
          </button>
          <button onClick={() => props.doRequest('createApplication')}>
            create app
          </button>
          <button onClick={() => props.doRequest('createModuleable')}>
            create moduleable
          </button>
          <button onClick={() => props.doRequest('createModule_1')}>
            create a module
          </button>
          <button onClick={() => props.doRequest('createModule_2')}>
            create another module
          </button>
        </div>
      )}
    </Requester>
  </Provider>
)

export default App

const MOCK_MODULEABLE = {
  name: 'User',
  fields: [
    { name: 'Name', type: 'text', multi: false, required: true },
    { name: 'Phone number', type: 'phone', multi: false, required: false },
  ],
}

const MOCK_MODULE_1 = {
  name: 'User',
  data: {
    Name: 'Simon',
    'Phone number': 1234567890,
  },
}

const MOCK_MODULE_2 = {
  name: 'User',
  data: {
    Name: 'Devin',
  },
}
