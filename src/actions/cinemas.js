import {
  GET_CINEMAS_SUCCESS,
  GET_CINEMAS_FAILURE
} from '../constans/actionTypes.js';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8080/';


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
      const { data } = await axios.get(`cinemas`);
      dispatch(getCinemasSuccess(data));
    } catch (error) {
      dispatch(getCinemasFailure(error));
    }
  }
}
