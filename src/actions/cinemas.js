import {
  GET_CINEMAS_SUCCESS,
  GET_CINEMAS_FAILURE
} from '../constans/actionTypes.js';

import axios from 'axios';


export const getCinemasSuccess = cinemas => {
  return {
    type: GET_CINEMAS_SUCCESS,
    payload: cinemas
  }
}

export const getCinemasFailure = error => {
  return {
    type: GET_CINEMAS_FAILURE,
    payload: error
  }
}

export function getCinemasAsync() {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`cinemas`);
      dispatch(getCinemasSuccess(data));
    } catch (error) {
      dispatch(getCinemasFailure(error));
    }
  }
}
