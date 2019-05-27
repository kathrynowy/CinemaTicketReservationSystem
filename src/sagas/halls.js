import { put, call } from 'redux-saga/effects';
import { GET_HALL_SUCCESS } from '../constans/actionTypes.js';
import axios from 'axios';

export function* getHallAsync(payload) {
  try {
    const { data } = yield call(() => axios.get(`halls/${payload.hallId}`));
    yield put(getHallSuccess(data));
  } catch (error) {
    console.log(error);
  }
}

export const getHallSuccess = hall => ({
  type: GET_HALL_SUCCESS,
  payload: hall
})
