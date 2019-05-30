import React from 'react'
import { Provider } from 'react-redux'
import store from './reducers/store'
import Requester from './components/Requester'

const App = () => (
  <Provider store={store}>
    <Requester
      requests={{
        login: {
          resource: 'login',
          method: 'post',
          data: {
            email: 'susan@earnwithdrop.com',
            password: 'password',
          },
        },
        createApplication: {
          resource: 'applications',
          method: 'post',
          data: { name: 'Test App' },
        },
        getApplication: {
          resource: 'applications/5cef745521aed6070cf3365d',
          method: 'get',
        },
        getRecordables: {
          resource: 'applications/5cef745521aed6070cf3365d/recordables',
          method: 'get',
        },
        createRecordable: {
          resource: 'applications/5cef745521aed6070cf3365d/recordables',
          method: 'post',
          data: {
            name: 'user',
            fields: [
              {
                name: 'phone_number',
                type: 'phone',
                required: false,
                multi: false,
              },
            ],
          },
        },
        createUser: {
          resource: 'applications/5cef745521aed6070cf3365d/records/user',
          method: 'post',
          data: {
            phone_number: 123123,
          },
        },
        getUsers: {
          resource: 'applications/5cef745521aed6070cf3365d/records/user',
          method: 'get',
        },
      }}
    >
      {({ fetching, ...requests }) => (
        <div>
          {Object.values(requests).map((request, index) => (
            <div>
              <button key={index} onClick={request}>
                {Object.keys(requests)[index]}
              </button>
            </div>
          ))}
        </div>
      )}
    </Requester>
  </Provider>
)

export default App
