import { GET_CINEMA_SUCCESS, GET_CINEMAS_SUCCESS, GET_CINEMAS_FAILURE } from '../constans/actionTypes.js'

const initialState = {
  allCinemas: [],
  error: {},
  cinema: {}
}

export default function getCinemas(state = initialState, action) {
  switch (action.type) {
    case GET_CINEMAS_SUCCESS:
      return Object.assign({}, state, {
        allCinemas: action.payload
      });

    case GET_CINEMA_SUCCESS:
      return Object.assign({}, state, {
        cinema: action.payload
      });

    case GET_CINEMAS_FAILURE:
      return Object.assign({}, state, {
        error: action.payload
      });

    default: return state;
  }
}
