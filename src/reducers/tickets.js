import {
  BUY_TICKET,
  GET_BOUGHT_TICKETS,
  ADD_BOUGHT_TICKET
} from '../constans/actionTypes.js';

const initialState = {
  boughtTickets: []
}

export default function ticketsList(state = initialState, action) {
  switch (action.type) {
    case BUY_TICKET:
      return Object.assign({}, state, {
        boughtTickets: action.payload
      })

    case GET_BOUGHT_TICKETS:
      return Object.assign({}, state, {
        boughtTickets: action.payload
      })

    case ADD_BOUGHT_TICKET: {
      const currentTicket = state.boughtTickets.find(ticket =>
        action.payload.cinemaId === ticket.cinemaId &&
        action.payload.hallId === ticket.hallId &&
        action.payload.movieId === ticket.movieId &&
        action.payload.time === ticket.time &&
        action.payload.row === ticket.row &&
        action.payload.seat === ticket.seat
      );
      const newBoughtTickets = currentTicket
        ? state.boughtTickets.filter(boughtTicket => boughtTicket !== currentTicket)
        : [...state.boughtTickets, action.payload]

      return Object.assign({}, state, {
        boughtTickets: newBoughtTickets
      })
    }

    default: return state;
  }
}
