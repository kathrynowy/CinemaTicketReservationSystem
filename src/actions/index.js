import { SELECT_TICKET, GET_SESSIONS_SUCCESS, GET_SESSIONS_FAILURE } from '../constans/actionTypes.js'

export const selectTicket = ticket => ({
  type: SELECT_TICKET,
  payload: ticket
})

export const getSessionsSuccess = (sessions) => {
  return {
    type: GET_SESSIONS_SUCCESS,
    payload: sessions
  }
}

export const getSessionsFailure = (err) => {
  return {
    type: GET_SESSIONS_FAILURE,
    isErrores: err
  }
}

export const getSessionsAsync = (sessions) => {
  return (dispatch) => {
    if (sessions !== null)
      return dispatch(getSessionsSuccess(sessions))
    return dispatch(getSessionsFailure(true))
  }
}
