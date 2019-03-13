import { BUY_TICKET } from '../constans/actionTypes.js';

const initialState = {
  boughtTickets: []
}

export default function ticketsList(state = initialState, action) {
  switch (action.type) {
    case BUY_TICKET:
      return Object.assign({}, state, {
        boughtTickets: [...state.boughtTickets, ...action.payload]
      })

    default: return state;
  }
}
