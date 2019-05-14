import {
  GET_MOVIES_SUCCESS,
  GET_MOVIES_FAILURE,
  FILTER_MOVIES_SUCCESS,
  GET_MOVIE_SUCCESS
} from '../constans/actionTypes.js';

import axios from 'axios';

export const filterMovies = value => {
  return {
    type: FILTER_MOVIES_SUCCESS,
    payload: value
  }
}

export function getMovieAsync(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`movies/${id}`);
      dispatch(getMovieSuccess(data));
    } catch (error) {
      console.log(error);
    }
  }
}

export const getMovieSuccess = movie => {
  return {
    type: GET_MOVIE_SUCCESS,
    payload: movie
  }
}

export function getMoviesAsync() {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`movies`);
      dispatch(getMoviesSuccess(data));
    } catch (error) {
      dispatch(getMoviesFailure(error));
    }
  }
}

export const getMoviesSuccess = movies => {
  return {
    type: GET_MOVIES_SUCCESS,
    payload: movies
  }
}

export const getMoviesFailure = error => {
  return {
    type: GET_MOVIES_FAILURE,
    payload: error
  }
}
