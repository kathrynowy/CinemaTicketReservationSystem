import {
  BUY_TICKETS_SUCCESS,
  GET_BOUGHT_TICKETS,
  ADD_BOUGHT_TICKET,
  GET_BOUGHT_TICKETS_SUCCESS
} from '../constans/actionTypes.js';

import { history } from '../App';
import { showSnackbar } from './snackbar';

import axios from 'axios';


export function getBoughtTicketsAsync(info) {
  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = token;
  return async (dispatch) => {
    try {
      const { data } = info ? await axios.get(`buyTickets?info=true`) : await axios.get(`buyTickets`);
      dispatch(getBoughtTicketsSuccess(data.length ? data : []));
    } catch (error) {
      console.log(error);
    }
  }
}

export const getBoughtTicketsSuccess = tickets => ({
  type: GET_BOUGHT_TICKETS_SUCCESS,
  payload: tickets
})

export const addBoughtTicket = ticket => {
  return {
    type: ADD_BOUGHT_TICKET,
    payload: ticket
  }
}

export function buyTicketsAsync(tickets) {
  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = token;
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`buyTickets`, { tickets });
      dispatch(buyTicketsSuccess(data.boughtTickets));
      dispatch(showSnackbar("Tickets purchased successfully"));
    } catch (error) {
      history.push('/sign-in');
      dispatch(showSnackbar("Please sign in to buy tickets"));
    }
  }
}

export function clearBooking(userId) {
  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = token;
  return async (dispatch) => {
    try {
      await axios.delete(`seats`, { data: { userId } });
    } catch (error) {
      dispatch(showSnackbar("Something is wrong"));
    }
  }
}

export const buyTicketsSuccess = tickets => ({
  type: BUY_TICKETS_SUCCESS,
  payload: tickets
})
