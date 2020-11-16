import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { ThemeProvider } from '@material-ui/styles'
import { Router } from '@reach/router'
import promise from 'redux-promise-middleware'
import SnackbarProvider from 'react-simple-snackbar'

import Login from 'views/login'
import theme from 'styles/material-ui'
import rootReducer from 'modules/reducers'
import App from 'views/app'
import General from 'views/general'
import DME from 'views/dme'
import RegisterLocation from 'views/location'
import Configuration from 'views/configuration'
import RegisterUser from 'views/register-user'

import * as serviceWorker from './serviceWorker'

import './index.css'

const errorMiddleware = () => {
  return (next) => (action) => {
    const result = next(action)

    if (!(result instanceof Promise)) {
      return action
    }

    return result.catch(() => {})
  }
}
const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(...[thunk, errorMiddleware, promise], logger)
  )
)
ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <Router>
          <App path="/">
            <General path="/" />
            <DME path="/:lab" />
            <Configuration path="/admin" />
            <RegisterLocation path="/registrar-ambiente" />
            <RegisterUser path="/registrar-tecnico" />
          </App>
          <Login path="/login" />
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
