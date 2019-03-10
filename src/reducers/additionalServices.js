import { GET_ADDITIONAL_SERVICES_SUCCESS, GET_ADDITIONAL_SERVICES_FAILURE } from '../constans/actionTypes.js'

const initialState = {
  additionalServices: [],
  isErrored: false
}

export default function getAdditionalServices(state = initialState, action) {
  switch (action.type) {
    case GET_ADDITIONAL_SERVICES_SUCCESS:
    return Object.assign({}, state, {
      additionalServices: action.payload
    });
    case GET_ADDITIONAL_SERVICES_FAILURE:
      return Object.assign({}, state, {
        isErrored: action.payload
      });
    default: return state;
  }
}