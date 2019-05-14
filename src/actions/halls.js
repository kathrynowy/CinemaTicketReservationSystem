import { GET_HALL_SUCCESS } from '../constans/actionTypes.js';

import axios from 'axios';

export function getHallAsync(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`halls/${id}`);
      dispatch(getHallSuccess(data));
    } catch (error) {
      console.log(error);
    }
  }
}

export const getHallSuccess = hall => {
  return {
    type: GET_HALL_SUCCESS,
    payload: hall
  }
}
