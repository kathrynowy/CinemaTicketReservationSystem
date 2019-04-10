import {
  GET_SEATS_SUCCESS,
  GET_SEATS_FAILURE,
  TOGGLE_SEAT,
  CLEAR_SELECTED_LIST
} from '../constans/actionTypes.js';

import { history } from '../App';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8080/';


export function getSeatsAsync(hallId) {
  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = token;
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`halls/${hallId}`);
      dispatch(getSeatsSuccess(data));
    } catch (error) {
      dispatch(getSeatsFailure(error));
      history.push('/sign-in');
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
