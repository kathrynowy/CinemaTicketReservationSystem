import {
  GET_CINEMAS_SUCCESS,
  GET_CINEMAS_FAILURE,
  GET_CINEMA_SUCCESS
} from '../constans/actionTypes.js';
import { put, call } from 'redux-saga/effects';
import axios from 'axios';


export const getCinemasSuccess = cinemas => ({
  type: GET_CINEMAS_SUCCESS,
  payload: cinemas
})

export const getCinemasFailure = error => ({
  type: GET_CINEMAS_FAILURE,
  payload: error
})

export function* getCinemasAsync() {
  try {
    const { data } = yield call(() => axios.get(`cinemas`));
    yield put(getCinemasSuccess(data));
  } catch (error) {
    yield put(getCinemasFailure(error));
  }
}

export const getCinemaSuccess = cinema => ({
  type: GET_CINEMA_SUCCESS,
  payload: cinema
})

export function* getCinemaAsync(payload) {
  try {
    const { data } = yield call(() => axios.get(`cinemas/${payload.cinemaId}`));
    yield put(getCinemaSuccess(data));
  } catch (error) {
    console.log(error);
  }
}
