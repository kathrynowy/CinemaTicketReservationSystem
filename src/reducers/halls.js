import { GET_HALL_SUCCESS } from '../constans/actionTypes.js'

const initialState = {
  hall: {}
}

export default function getHalls(state = initialState, action) {
  switch (action.type) {
    case GET_HALL_SUCCESS:
      return Object.assign({}, state, {
        hall: action.payload
      });

    default: return state;
  }
}
