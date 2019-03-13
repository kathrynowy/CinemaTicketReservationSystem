import { SELECT_TICKET, CLEAR_SELECTED_LIST, BUY_TICKET } from '../constans/actionTypes.js';

const initialState = {
  selectedSeats: [],
  boughtTickets: []
}

export default function ticketsList(state = initialState, action) {
  switch (action.type) {
    case SELECT_TICKET: {
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

    case BUY_TICKET:
      return Object.assign({}, state, {
        boughtTickets: [...state.boughtTickets, ...action.payload]
      })

    default: return state;
  }
}
