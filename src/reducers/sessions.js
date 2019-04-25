import { GET_SESSIONS_SUCCESS, GET_SESSIONS_FAILURE } from '../constans/actionTypes.js'

const initialState = {
  allSessions: [],
  error: {}
}

export default function getSessions(state = initialState, action) {
  switch (action.type) {
    case GET_SESSIONS_SUCCESS:
      return Object.assign({}, state, {
        allSessions: action.payload
      });

    case GET_SESSIONS_FAILURE:
      return Object.assign({}, state, {
        error: action.payload
      });

    default: return state;
  }
}
