const SELECT_TICKET = 'SELECT_TICKET';

export const selectTicket = ticket => ({
  type: SELECT_TICKET,
  payload: ticket
})
