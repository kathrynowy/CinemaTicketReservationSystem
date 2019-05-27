import { put, call } from 'redux-saga/effects';
import history from '../App';
import axios from 'axios';
import {
  GET_SEATS_SUCCESS,
  GET_SEATS_FAILURE,
  TOGGLE_SEAT_SUCCESS,
  GET_SELECTED_SEATS_SUCCESS,
  ADD_SELECTED_SEAT,
  CLEAR_SELECTED_LIST
} from '../constans/actionTypes.js';
import { showSnackbar } from './snackbar';

export function* getSeatsAsync(payload) {
  try {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = token;
    const { data } = yield call(() => axios.get(`halls/${payload.hallId}`));
    yield put(getSeatsSuccess(data));
  } catch (error) {
    yield put(getSeatsFailure(error));
    yield history.push('/sign-in');
  }
}

export const getSeatsSuccess = movies => ({
  type: GET_SEATS_SUCCESS,
  payload: movies
})

export const getSeatsFailure = error => ({
  type: GET_SEATS_FAILURE,
  payload: error
})

export function* getSelectedSeats({ cinemaId, hallId, movieId, time }) {
  try {
    const { data } = yield call(() => axios.get(`seats?cinemaId=${cinemaId}&hallId=${hallId}&movieId=${movieId}&time=${time}`));
    yield put(getSelectedSeatsSuccess(data));
  } catch (error) {
    yield put(getSelectedSeatsFailure(error));
  }
}

export const getSelectedSeatsSuccess = selectedSeats => ({
  type: GET_SELECTED_SEATS_SUCCESS,
  payload: selectedSeats
})

export const getSelectedSeatsFailure = error => ({
  type: GET_SEATS_FAILURE,
  payload: error
})

export function* toggleSeat(payload) {
  try {
    yield put(toggleSeatSuccess(payload.seat));
  } catch (error) {
    yield put(showSnackbar("Please reload the page"));
  }
}

export const toggleSeatSuccess = seat => {
  return {
    type: TOGGLE_SEAT_SUCCESS,
    payload: seat
  }
}

export const addSelectedSeat = seat => {
  return {
    type: ADD_SELECTED_SEAT,
    payload: seat
  }
}

export const clearSelectedSeats = () => ({
  type: CLEAR_SELECTED_LIST
})

