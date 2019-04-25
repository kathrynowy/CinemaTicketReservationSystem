import {
  CLEAR_SELECTED_LIST,
  TOGGLE_SEAT,
  GET_SEATS_SUCCESS,
  GET_SEATS_FAILURE,
  GET_SELECTED_SEATS_SUCCESS,
  ADD_SELECTED_SEAT
} from '../constans/actionTypes.js';

const initialState = {
  selectedSeats: [],
  allSeats: [],
  bookingSeats: [],
  error: {}
}

export default function seatsList(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SEAT: {
      const newSelectedSeats = (state.selectedSeats.find(seat => action.payload.id === seat.id)
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

    case ADD_SELECTED_SEAT:
      return Object.assign({}, state, {
        selectedSeats: [...state.selectedSeats, action.payload]
      })

    case GET_SELECTED_SEATS_SUCCESS:
      return Object.assign({}, state, {
        bookingSeats: action.payload
      })

    case GET_SEATS_SUCCESS:
      return Object.assign({}, state, {
        allSeats: action.payload
      });

    case GET_SEATS_FAILURE:
      return Object.assign({}, state, {
        error: action.payload
      });

    default: return state;
  }
}
