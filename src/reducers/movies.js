import { GET_MOVIES_SUCCESS, GET_MOVIES_FAILURE, FILTER_MOVIES_SUCCESS } from '../constans/actionTypes.js'

const initialState = {
  allMovies: [],
  filteredMovies: [],
  error: {}
}

export default function getMovies(state = initialState, action) {
  switch (action.type) {
    case GET_MOVIES_SUCCESS:
      return Object.assign({}, state, {
        allMovies: action.payload
      });

    case GET_MOVIES_FAILURE:
      return Object.assign({}, state, {
        error: action.payload
      });

    case FILTER_MOVIES_SUCCESS: {
      let movies = [];
      action.payload
        ? movies = state.allMovies.filter(movie => (movie.name.toLowerCase()).indexOf(action.payload.toLowerCase()) >= 0)
        : movies = [...state.allMovies];

      return Object.assign({}, state, {
        filteredMovies: movies
      });
    }
    default: return state;
  }
}
