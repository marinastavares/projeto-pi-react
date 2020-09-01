import { defineAction } from 'redux-define'

import * as monitorsServices from 'services/monitors'

const REQUEST = ['PENDING', 'FULFILLED', 'REJECTED', 'COUNT']

export const GET_MONITORS = defineAction('GET_MONITORS', REQUEST)

export const getMonitors = () => (dispatch) => {
  dispatch({
    type: GET_MONITORS.ACTION,
    payload: monitorsServices.getMonitors(),
  })
}
