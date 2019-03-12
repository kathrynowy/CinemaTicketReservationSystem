import { SELECT_TICKET, BUY_TICKET, GET_CINEMAS_SUCCESS, GET_CINEMAS_FAILURE, GET_MOVIES_SUCCESS, GET_MOVIES_FAILURE, GET_SESSIONS_SUCCESS, GET_SESSIONS_FAILURE, GET_ADDITIONAL_SERVICES_SUCCESS, GET_ADDITIONAL_SERVICES_FAILURE } from '../constans/actionTypes.js'


export const selectTicket = ticket => ({
  type: SELECT_TICKET,
  payload: {
    id: ticket.id,
    cinemaId: ticket.cinemaId,
    movieId: ticket.movieId,
    hallId: ticket.hallId,
    row: ticket.row,
    seat: ticket.seat,
    cost: ticket.cost
  }
})

export const buyTickets = tickets => ({
  type: BUY_TICKET,
  payload: tickets
})

export const getMoviesAsync = (movies) => {
  return (dispatch) => {
    if (movies !== null)
      return dispatch(getMoviesSuccess(movies))
    return dispatch(getMoviesFailure(true))
  }
}

export const getMoviesSuccess = (movies) => {
  return {
    type: GET_MOVIES_SUCCESS,
    payload: movies
  }
}

export const getMoviesFailure = (err) => {
  return {
    type: GET_MOVIES_FAILURE,
    isErrored: err
  }
}

export const getSessionsSuccess = (sessions) => {
  return {
    type: GET_SESSIONS_SUCCESS,
    payload: sessions
  }
}

export const getSessionsFailure = (err) => {
  return {
    type: GET_SESSIONS_FAILURE,
    isErrored: err
  }
}

export const getSessionsAsync = (sessions) => {
  return (dispatch) => {
    if (sessions !== null)
      return dispatch(getSessionsSuccess(sessions))
    return dispatch(getSessionsFailure(true))
  }
}

export const getCinemasSuccess = (cinemas) => {
  return {
    type: GET_CINEMAS_SUCCESS,
    payload: cinemas
  }
}

export const getCinemasFailure = (err) => {
  return {
    type: GET_CINEMAS_FAILURE,
    isErrored: err
  }
}

export const getCinemasAsync = (cinemas) => {
  return (dispatch) => {
    if (cinemas !== null)
      return dispatch(getCinemasSuccess(cinemas))
    return dispatch(getCinemasFailure(true))
  }
}


export const getAdditionalServicesSuccessful = (additionalServices) => {
  return {
    type: GET_ADDITIONAL_SERVICES_SUCCESS,
    payload: additionalServices
  }
}

export const getAdditionalServicesFailure = (additionalServices) => {
  return {
    type: GET_ADDITIONAL_SERVICES_FAILURE,
    payload: additionalServices
  }
}

export const getAdditionalServicesAsync = (additionalServices) => {
  return (dispatch) => {
    if (additionalServices.length !== 0)
      return dispatch(getAdditionalServicesSuccessful(additionalServices))
    return dispatch(getAdditionalServicesFailure(true))
  }
}
