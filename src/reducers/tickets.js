const SELECT_TICKET = 'SELECT_TICKET';

const initialState = {
  selectedSeats: []
}

export default function selectTicket(state = initialState, action) {
  switch (action.type) {
    case SELECT_TICKET:
      {
        const newSelectedSeats = (state.selectedSeats.find(seat => action.payload.id == seat.id)
          ? state.selectedSeats.filter(selectedSeat => selectedSeat.id !== action.payload.id)
          : [...state.selectedSeats, action.payload]
        );
        return Object.assign({}, state, {
          selectedSeats: newSelectedSeats
        })
      }
    default: return state;
  }
}
