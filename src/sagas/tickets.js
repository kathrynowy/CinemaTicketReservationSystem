import { put, call } from 'redux-saga/effects';
import {
  GET_BOUGHT_TICKETS_SUCCESS,
  ADD_BOUGHT_TICKET,
  BUY_TICKETS_SUCCESS
} from '../constans/actionTypes.js';
import { history } from '../App';
import { showSnackbar } from './snackbar';
import axios from 'axios';


export function* getBoughtTicketsAsync(payload) {
  try {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = token;
    const { data } = yield payload.info ? call(() => axios.get(`buyTickets?info=true`)) : call(() => axios.get(`buyTickets`));
    yield put(getBoughtTicketsSuccess(data.length ? data : []));
  } catch (error) {
    console.log(error);
  }
}

export const getBoughtTicketsSuccess = tickets => ({
  type: GET_BOUGHT_TICKETS_SUCCESS,
  payload: tickets
})

export const addBoughtTicket = ticket => ({
  type: ADD_BOUGHT_TICKET,
  payload: ticket
})

export function* buyTicketsAsync(payload) {
  try {
    const token = localStorage.getItem('token');
    const tickets = payload.tickets;
    axios.defaults.headers.common['Authorization'] = token;
    const { data } = yield call(() => axios.put(`buyTickets`, { tickets }));
    yield put(buyTicketsSuccess(data));
    yield put(showSnackbar("Tickets purchased successfully"));
  } catch (error) {
    yield history.push('/sign-in');
    yield put(showSnackbar("Please sign in to buy tickets"));
  }
}

export function* clearBooking({ userId }) {
  try {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = token;
    yield call(() => axios.delete(`seats`, { data: { userId } }));
  } catch (error) {
    yield put(showSnackbar("Something is wrong"));
  }
}

export const buyTicketsSuccess = tickets => ({
  type: BUY_TICKETS_SUCCESS,
  payload: tickets
})
