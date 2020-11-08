import { defineAction } from 'redux-define'

import * as userService from 'services/user'

const REQUEST = ['PENDING', 'FULFILLED', 'REJECTED', 'COUNT']

export const CREATE_USER = defineAction('CREATE_USER', REQUEST)
export const LOGIN = defineAction('CREATE_USER', REQUEST)

export const createUser = (payload) => (dispatch) => {
  dispatch({
    type: CREATE_USER.ACTION,
    payload: userService.createUser(payload),
  })
}

export const login = (payload) => (dispatch) => {
  dispatch({
    type: LOGIN.ACTION,
    payload: userService.login(payload),
  })
}
