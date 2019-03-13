import { GET_MOVIES_SUCCESS, GET_MOVIES_FAILURE } from '../constans/actionTypes.js'

const initialState = {
  movies: [],
  isErrored: false
}

export default function getMovies(state = initialState, action) {
  switch (action.type) {
    case GET_MOVIES_SUCCESS:
      return Object.assign({}, state, {
        movies: action.payload
      });
    case GET_MOVIES_FAILURE:
      return Object.assign({}, state, {
        isErrored: action.isErrored
      });
    default: return state;
  }
}
