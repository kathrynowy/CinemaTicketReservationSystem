import { CLEAR_SELECTED_LIST, TOGGLE_SEAT } from '../constans/actionTypes.js';

const initialState = {
  selectedSeats: []
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

    default: return state;
  }
}
