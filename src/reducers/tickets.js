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

    case ADD_BOUGHT_TICKET:
      return Object.assign({}, state, {
        boughtTickets: [...state.boughtTickets, action.payload]
      })

    default: return state;
  }
}
