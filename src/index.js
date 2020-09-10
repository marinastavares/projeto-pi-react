import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import promiseMiddleware from 'redux-promise-middleware'
import { ThemeProvider } from '@material-ui/styles'
import { Router } from '@reach/router'

import theme from 'styles/material-ui'
import rootReducer from 'modules/reducers'
import App from 'views/app'
import LandingPage from 'views/landing'
import Dashboard from 'views/dashboard'
import Info from 'views/info'

import * as serviceWorker from './serviceWorker'
import './index.css'

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, promiseMiddleware, logger))
)

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router>
        <Dashboard path="dashboard" />
        <App path="/">
          <LandingPage path="/" />
          <Info path="/modulo" />
        </App>
      </Router>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
