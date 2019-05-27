import {
  SIGN_IN_SUCCESS,
  CHECK_AUTH_SUCCESS,
  LOG_OUT_SUCCESS
} from '../constans/actionTypes.js'


const initialState = {
  isUserLoggedIn: false,
  currentUser: {}
}

export default function users(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return Object.assign({}, state, {
        isUserLoggedIn: true,
        currentUser: action.payload
      });

    case CHECK_AUTH_SUCCESS:
      return Object.assign({}, state, {
        currentUser: action.payload
      });

    case LOG_OUT_SUCCESS:
      return Object.assign({}, state, {
        currentUser: {},
        isUserLoggedIn: false
      });

    default: return state;
  }
}
