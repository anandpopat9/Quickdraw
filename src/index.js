import React from 'react'
import { render } from 'react-dom'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'
import { fetchCommands } from './actions'
import rootReducer from './reducers'
import './index.css';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunkMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : () => {}
  )
)
store.dispatch(fetchCommands());
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

