const SELECT_TICKET = 'SELECT_TICKET';

const initialState = {
  selectedSeats: []
}

export default function selectTicket(state = initialState, action) {
  switch (action.type) {
    case SELECT_TICKET:
      return Object.assign({}, state, {
        selectedSeats: state.selectedSeats.includes(action.payload)
          ? state.selectedSeats.filter(seat => seat !== action.payload)
          : [...state.selectedSeats, action.payload]
      })

    default: return state;
  }
}