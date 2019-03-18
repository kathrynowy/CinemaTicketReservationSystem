import {
  CLEAR_SELECTED_LIST,
  TOGGLE_SEAT,
  GET_SEATS_SUCCESS,
  GET_SEATS_FAILURE
} from '../constans/actionTypes.js';

const initialState = {
  selectedSeats: [],
  seats: [],
  isErrored: false
}

export default function seatsList(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SEAT: {
      const newSelectedSeats = (state.selectedSeats.find(seat => action.payload.id == seat.id)
        ? state.selectedSeats.filter(selectedSeat => selectedSeat.id !== action.payload.id)
        : [...state.selectedSeats, action.payload]
      );
      return Object.assign({}, state, {
        selectedSeats: newSelectedSeats
      })
    }

    case CLEAR_SELECTED_LIST:
      return Object.assign({}, state, {
        selectedSeats: []
      })

    case GET_SEATS_SUCCESS:
      return Object.assign({}, state, {
        seats: action.payload
      });

    case GET_SEATS_FAILURE:
      return Object.assign({}, state, {
        isErrored: action.payload
      });

    default: return state;
  }
}
