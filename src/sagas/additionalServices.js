import { put, call } from 'redux-saga/effects';
import history from '../App';
import axios from 'axios';
import { GET_ADDITIONAL_SERVICES_SUCCESS, GET_ADDITIONAL_SERVICES_FAILURE } from '../constans/actionTypes.js';

export const getAdditionalServicesSuccess = additionalServices => ({
  type: GET_ADDITIONAL_SERVICES_SUCCESS,
  payload: additionalServices
})

export const getAdditionalServicesFailure = error => ({
  type: GET_ADDITIONAL_SERVICES_FAILURE,
  payload: error
})

export function* getAdditionalServicesAsync(payload) {
  try {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = token;
    const { data } = yield call(() => axios.get(`cinemas/${payload.cinemaId}`));
    yield put(getAdditionalServicesSuccess(data.additionalServices));
  } catch (error) {
    yield put(getAdditionalServicesFailure(error));
    yield history.push('/sign-in');
  }
}
