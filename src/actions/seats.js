import {
  GET_SEATS_SUCCESS,
  GET_SEATS_FAILURE,
  TOGGLE_SEAT,
  CLEAR_SELECTED_LIST,
  GET_SELECTED_SEATS_SUCCESS,
  ADD_SELECTED_SEAT
} from '../constans/actionTypes.js';

import { showSnackbar } from './snackbar'
import { history } from '../App';
import axios from 'axios';


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

export const getSelectedSeats = (cinemaId, hallId, movieId, time) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`seats?cinemaId=${cinemaId}&hallId=${hallId}&movieId=${movieId}&time=${time}`);
      dispatch(getSelectedSeatsSuccess(data));
    } catch (error) {
      dispatch(getSelectedSeatsFailure(error));
    }
  }
}

export const getSelectedSeatsSuccess = selectedSeats => {
  return {
    type: GET_SELECTED_SEATS_SUCCESS,
    payload: selectedSeats
  }
}

export const getSelectedSeatsFailure = isError => {
  return {
    type: GET_SEATS_FAILURE,
    payload: isError
  }
}

export const toggleSeat = seat => {
  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = token;
  return async (dispatch) => {
    try {
      const user = await axios.post(`user`);
      const newSeat = {
        ...seat,
        userId: user.data.id
      }
      const { data } = await axios.post(`seats`, newSeat);
      dispatch(toggleSeatSuccess(data || newSeat));
    } catch (error) {
      console.log(error);
      dispatch(showSnackbar("Please reload the page, this place most likely is already taken"));
    }
  }
}

export const toggleSeatSuccess = (seat) => {
  return {
    type: TOGGLE_SEAT,
    payload: seat
  }
}

export const addSelectedSeat = (seat) => {
  return {
    type: ADD_SELECTED_SEAT,
    payload: seat
  }
}

export const clearSelectedSeats = () => ({
  type: CLEAR_SELECTED_LIST
})
