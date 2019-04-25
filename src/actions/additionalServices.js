import {
  GET_ADDITIONAL_SERVICES_SUCCESS,
  GET_ADDITIONAL_SERVICES_FAILURE
} from '../constans/actionTypes.js';

import axios from 'axios';
import { history } from '../App';


export const getAdditionalServicesSuccess = additionalServices => {
  return {
    type: GET_ADDITIONAL_SERVICES_SUCCESS,
    payload: additionalServices
  }
}

export const getAdditionalServicesFailure = error => {
  return {
    type: GET_ADDITIONAL_SERVICES_FAILURE,
    payload: error
  }
}

export const getAdditionalServicesAsync = id => {
  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = token;
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`cinemas/${id}`);
      dispatch(getAdditionalServicesSuccess(data.additionalServices));
    } catch (error) {
      dispatch(getAdditionalServicesFailure(error));
      history.push('/sign-in');
    }
  }
}
