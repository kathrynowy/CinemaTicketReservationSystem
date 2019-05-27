import { put, call } from 'redux-saga/effects';

import {
  GET_MOVIES_SUCCESS,
  GET_MOVIES_FAILURE,
  FILTER_MOVIES_SUCCESS,
  GET_MOVIE_SUCCESS
} from '../constans/actionTypes.js';

import axios from 'axios';

export const filterMovies = value => ({
  type: FILTER_MOVIES_SUCCESS,
  payload: value
})

export function* getMovieAsync(payload) {
  try {
    const { data } = yield call(() => axios.get(`movies/${payload.movieId}`));
    yield put(getMovieSuccess(data));
  } catch (error) {
    console.log(error);
  }
}

export const getMovieSuccess = movie => ({
  type: GET_MOVIE_SUCCESS,
  payload: movie
})

export function* getMoviesAsync() {
  try {
    const { data } = yield call(() => axios.get(`movies`));
    yield put(getMoviesSuccess(data));
  } catch (error) {
    yield put(getMoviesFailure(error));
  }
}

export const getMoviesSuccess = movies => ({
  type: GET_MOVIES_SUCCESS,
  payload: movies
})

export const getMoviesFailure = error => ({
  type: GET_MOVIES_FAILURE,
  payload: error
})
