import { put, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  GET_SESSIONS_SUCCESS,
  GET_SESSIONS_FAILURE
} from '../constans/actionTypes.js';

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

export function* getSessionsAsync() {
  try {
    const { data } = yield call(() => axios.get('sessions'));
    yield put(getSessionsSuccess(data));
  } catch (error) {
    yield put(getSessionsFailure(error));
  }
}
