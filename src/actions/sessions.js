import {
  GET_SESSIONS_SUCCESS,
  GET_SESSIONS_FAILURE,
} from '../constans/actionTypes.js';

import axios from 'axios';

export const getSessionsSuccess = sessions => {
  return {
    type: GET_SESSIONS_SUCCESS,
    payload: sessions
  }
}

export const getSessionsFailure = error => {
  return {
    type: GET_SESSIONS_FAILURE,
    payload: error
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
