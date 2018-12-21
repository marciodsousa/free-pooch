
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducer from './reducers'

import { createStore, applyMiddleware } from 'redux'

const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)

export default store;