import { takeEvery, all } from 'redux-saga/effects';

import {
  GET_SESSIONS,
  GET_ADDITIONAL_SERVICES,
  GET_SEATS,
  GET_SELECTED_SEATS,
  TOGGLE_SEAT,
  GET_MOVIE,
  GET_MOVIES,
  GET_CINEMA,
  GET_CINEMAS,
  GET_HALL,
  BUY_TICKETS,
  GET_BOUGHT_TICKETS,
  CLEAR_BOOKING,
  CHECK_AUTH,
  SIGN_UP,
  SIGN_IN,
  LOG_OUT
} from '../constans/actionTypes.js';

import { getSessionsAsync } from './sessions';
import { getAdditionalServicesAsync } from './additionalServices';
import { getSeatsAsync, getSelectedSeats, toggleSeat } from './seats';
import { getMovieAsync, getMoviesAsync } from './movies';
import { getCinemaAsync, getCinemasAsync } from './cinemas';
import { getHallAsync } from './halls.js';
import { getBoughtTicketsAsync, buyTicketsAsync, clearBooking } from './tickets.js';
import { checkAuth, signUp, signIn, logOut } from './users.js';


export function* watchSessionsRequest() {
  yield takeEvery(GET_SESSIONS, getSessionsAsync);
}

export function* watchAdditionalServicesRequest() {
  yield takeEvery(GET_ADDITIONAL_SERVICES, getAdditionalServicesAsync);
}

export function* watchSeatsRequest() {
  yield takeEvery(GET_SEATS, getSeatsAsync);
}

export function* watchSelectedSeatsRequest() {
  yield takeEvery(GET_SELECTED_SEATS, getSelectedSeats);
}

export function* watchSeatToggling() {
  yield takeEvery(TOGGLE_SEAT, toggleSeat);
}

export function* watchMovieRequest() {
  yield takeEvery(GET_MOVIE, getMovieAsync);
}

export function* watchMoviesRequest() {
  yield takeEvery(GET_MOVIES, getMoviesAsync);
}

export function* watchCinemaRequest() {
  yield takeEvery(GET_CINEMA, getCinemaAsync);
}

export function* watchCinemasRequest() {
  yield takeEvery(GET_CINEMAS, getCinemasAsync);
}

export function* watchHallRequest() {
  yield takeEvery(GET_HALL, getHallAsync);
}

export function* watchTicketsPurchase() {
  yield takeEvery(BUY_TICKETS, buyTicketsAsync);
}

export function* watchBoughtTicketsRequest() {
  yield takeEvery(GET_BOUGHT_TICKETS, getBoughtTicketsAsync);
}

export function* watchClearBooking() {
  yield takeEvery(CLEAR_BOOKING, clearBooking);
}

export function* watchCheckAuthRequest() {
  yield takeEvery(CHECK_AUTH, checkAuth);
}

export function* watchSignUpRequest() {
  yield takeEvery(SIGN_UP, signUp);
}

export function* watchSignInRequest() {
  yield takeEvery(SIGN_IN, signIn);
}

export function* watchLogOutRequest() {
  yield takeEvery(LOG_OUT, logOut);
}

export default function* rootSaga() {
  yield all([
    watchSessionsRequest(),
    watchAdditionalServicesRequest(),
    watchSeatsRequest(),
    watchSelectedSeatsRequest(),
    watchSeatToggling(),
    watchMovieRequest(),
    watchMoviesRequest(),
    watchCinemaRequest(),
    watchCinemasRequest(),
    watchHallRequest(),
    watchTicketsPurchase(),
    watchBoughtTicketsRequest(),
    watchClearBooking(),
    watchSignUpRequest(),
    watchSignInRequest(),
    watchLogOutRequest(),
    watchCheckAuthRequest()
  ])
}
