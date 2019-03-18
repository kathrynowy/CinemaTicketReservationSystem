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

export function getMoviesAsync() {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`http://localhost:8080/movies`);
      dispatch(getMoviesSuccess(data));
    } catch (error) {
      dispatch(getMoviesFailure(error));
    }
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

export function getSessionsAsync() {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`http://localhost:8080/sessions`);
      dispatch(getSessionsSuccess(data));
    } catch (error) {
      dispatch(getSessionsFailure(error));
    }
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

export function getCinemasAsync() {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`http://localhost:8080/cinemas`);
      dispatch(getCinemasSuccess(data));
    } catch (error) {
      dispatch(getCinemasFailure(error));
    }
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
