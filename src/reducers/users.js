import {
  SIGN_IN_SUCCESS,
  CHECK_AUTH_SUCCESS,
  LOGOUT_SUCCESS
} from '../constans/actionTypes.js'


const initialState = {
  isUserLoggedIn: false,
  currentUser: {}
}

export default function users(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return Object.assign({}, state, {
        isUserLoggedIn: true
      });

    case CHECK_AUTH_SUCCESS:
      return Object.assign({}, state, {
        currentUser: action.payload
      });

    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        currentUser: {}
      });

    default: return state;
  }
}
