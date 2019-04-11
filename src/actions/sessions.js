import {
  GET_SESSIONS_SUCCESS,
  GET_SESSIONS_FAILURE,
} from '../constans/actionTypes.js';

import { showSpinner, hideSpinner } from './spinner';

import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080/';


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
      const { data } = await axios.get(`sessions`);
      dispatch(getSessionsSuccess(data));
    } catch (error) {
      dispatch(getSessionsFailure(error));
    }
  }
}
