import io from 'socket.io-client';
import { apiBaseUrl } from "./configs/config";
import { TOGGLE_SEAT } from './constans/actionTypes'
import { addBoughtTicket } from './sagas/tickets';


const socket = io(apiBaseUrl);

const configureSocket = dispatch => {
  socket.on('connect', () => {
    console.log('connected');
  });

  socket.on('disconnect', () => {
    console.log('disconnected');
  });

  socket.on('TOGGLE_SEAT', seat => dispatch({ type: TOGGLE_SEAT, seat }));
  socket.on('BOUGHT_SEAT', ticket => dispatch(addBoughtTicket(ticket)));

  return socket;
}

export const sendToggledSeatToServer = (seat, userId) => socket.emit('SEND_TOGGLES_SEAT_TO_SERVER', { ...seat, userId });

export default configureSocket;
