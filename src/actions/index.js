import {
  TOGGLE_SEAT,
  CLEAR_SELECTED_LIST,
  BUY_TICKET,
  GET_CINEMAS_SUCCESS,
  GET_CINEMAS_FAILURE,
  GET_MOVIES_SUCCESS,
  GET_MOVIES_FAILURE,
  GET_SESSIONS_SUCCESS,
  GET_SESSIONS_FAILURE,
  GET_ADDITIONAL_SERVICES_SUCCESS,
  GET_ADDITIONAL_SERVICES_FAILURE,
  GET_SEATS_SUCCESS,
  GET_SEATS_FAILURE
} from '../constans/actionTypes.js';
import axios from 'axios';


export const toggleSeat = ticket => ({
  type: TOGGLE_SEAT,
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

export const clearSelectedSeats = () => ({
  type: CLEAR_SELECTED_LIST
})

export const buyTickets = tickets => ({
  type: BUY_TICKET,
  payload: tickets
})

export const getMoviesAsync = (movies) => {
  return (dispatch) => {
    axios.get(`http://localhost:8080/movies`)
      .then(res => {
        dispatch(getMoviesSuccess(res.data)
        )
      })
      .catch(err => {
        dispatch(getMoviesFailure(err)
        )
      })
  }
}

export const getMoviesSuccess = (movies) => {
  return {
    type: GET_MOVIES_SUCCESS,
    payload: movies
  }
}

export const getMoviesFailure = (isError) => {
  return {
    type: GET_MOVIES_FAILURE,
    payload: isError
  }
}

export const getSeatsAsync = (movies) => {
  return (dispatch) => {
    movies !== null
      ? dispatch(getSeatsSuccess(movies))
      : dispatch(getSeatsFailure(true))
  }
}

export const getSeatsSuccess = (movies) => {
  return {
    type: GET_SEATS_SUCCESS,
    payload: movies
  }
}

export const getSeatsFailure = (isError) => {
  return {
    type: GET_SEATS_FAILURE,
    payload: isError
  }
}

export const getSessionsSuccess = (sessions) => {
  return {
    type: GET_SESSIONS_SUCCESS,
    payload: sessions
  }
}

export const getSessionsFailure = (isError) => {
  return {
    type: GET_SESSIONS_FAILURE,
    payload: isError
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

export const getCinemasFailure = (isError) => {
  return {
    type: GET_CINEMAS_FAILURE,
    payload: isError
  }
}

export const getCinemasAsync = () => {
  return (dispatch) => {
    axios.get(`http://localhost:8080/cinemas`)
      .then(res => {
        dispatch(getCinemasSuccess(res.data)
        )
      })
      .catch(err => {
        dispatch(getCinemasFailure(err)
        )
      })
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
