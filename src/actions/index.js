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
  GET_SEATS_FAILURE,
  GET_BOUGHT_TICKETS
} from '../constans/actionTypes.js';
import axios from 'axios';
const url = "http://localhost:8080/";


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

export function getBoughtTicketsAsync() {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${url}buyTickets`);
      dispatch(getBoughtTicketsSuccess(data[0].boughtTickets));
    } catch (error) {
      console.log(error);
    }
  }
}

export const getBoughtTicketsSuccess = (tickets) => ({
  type: GET_BOUGHT_TICKETS,
  payload: tickets
})

export const clearSelectedSeats = () => ({
  type: CLEAR_SELECTED_LIST
})

export function buyTicketsAsync(tickets) {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`${url}buyTickets`, { tickets });
      dispatch(buyTicketsSuccess(data.boughtTickets));
    } catch (error) {
      console.log(error);
    }
  }
}

export const buyTicketsSuccess = tickets => ({
  type: BUY_TICKET,
  payload: tickets
})

export function getMoviesAsync() {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${url}movies`);
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

export function getSeatsAsync(hallId) {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${url}halls/${hallId}`);
      dispatch(getSeatsSuccess(data));
    } catch (error) {
      dispatch(getSeatsFailure(error));
    }
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
      const { data } = await axios.get(`${url}sessions`);
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
      const { data } = await axios.get(`${url}cinemas`);
      dispatch(getCinemasSuccess(data));
    } catch (error) {
      dispatch(getCinemasFailure(error));
    }
  }
}

export const getAdditionalServicesSuccess = (additionalServices) => {
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

export const getAdditionalServicesAsync = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${url}cinemas/${id}`);
      dispatch(getAdditionalServicesSuccess(data.additionalServices));
    } catch (error) {
      dispatch(getAdditionalServicesFailure(error));
    }
  }
}
