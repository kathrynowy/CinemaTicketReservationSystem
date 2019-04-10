import { SIGN_IN_SUCCESS, LOG_OUT } from '../constans/actionTypes.js'


const initialState = {
  isUserLoggedIn: false
}

export default function users(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return Object.assign({}, state, {
        isUserLoggedIn: true
      });
    default: return state;
  }
}
