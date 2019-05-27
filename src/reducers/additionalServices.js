import {
  GET_ADDITIONAL_SERVICES_SUCCESS,
  GET_ADDITIONAL_SERVICES_FAILURE,
  GET_ADDITIONAL_SERVICES
} from '../constans/actionTypes.js'

const initialState = {
  allAdditionalServices: [],
  error: {}
}

export default function getAdditionalServices(state = initialState, action) {
  switch (action.type) {
    case GET_ADDITIONAL_SERVICES:
      return Object.assign({}, state, {
        error: {}
      });

    case GET_ADDITIONAL_SERVICES_SUCCESS:
      return Object.assign({}, state, {
        allAdditionalServices: action.payload
      });

    case GET_ADDITIONAL_SERVICES_FAILURE:
      return Object.assign({}, state, {
        error: action.payload
      });

    default: return state;
  }
}
