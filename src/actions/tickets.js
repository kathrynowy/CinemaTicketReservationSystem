import {
  BUY_TICKET,
  GET_BOUGHT_TICKETS
} from '../constans/actionTypes.js';
import axios from 'axios';
import { history } from '../App';

axios.defaults.baseURL = 'http://localhost:8080/';


export function getBoughtTicketsAsync() {
  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = token;
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`buyTickets`);
      dispatch(getBoughtTicketsSuccess(data[0].boughtTickets));
    } catch (error) {
      console.log(error);
      history.push('/sign-in');
    }
  }
}

export const getBoughtTicketsSuccess = (tickets) => ({
  type: GET_BOUGHT_TICKETS,
  payload: tickets
})

export function buyTicketsAsync(tickets) {
  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = token;
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`buyTickets`, { tickets });
      dispatch(buyTicketsSuccess(data.boughtTickets));
    } catch (error) {

      console.log(error);
      history.push('/sign-in');
    }
  }
}

export const buyTicketsSuccess = tickets => ({
  type: BUY_TICKET,
  payload: tickets
})
