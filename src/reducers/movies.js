import { GET_MOVIES_SUCCESS, GET_MOVIES_FAILURE, FIND_MOVIES_SUCCESS } from '../constans/actionTypes.js'

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
    case FIND_MOVIES_SUCCESS: {
      let movies = [];
      action.payload
        ? movies = state.movies.filter(movie => (movie.name.toLowerCase()).indexOf(action.payload.toLowerCase()) >= 0)
        : movies = [...state.movies];

      return Object.assign({}, state, {
        filteredMovies: movies
      });
    }
    default: return state;
  }
}
