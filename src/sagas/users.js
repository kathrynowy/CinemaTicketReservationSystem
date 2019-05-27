import {
  SIGN_IN_SUCCESS,
  CHECK_AUTH_SUCCESS,
  LOG_OUT_SUCCESS
} from '../constans/actionTypes.js';
import { put, call } from 'redux-saga/effects';
import axios from 'axios';
import { history } from '../App';
import { showSnackbar } from './snackbar'


export function* checkAuth() {
  try {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = token;
    const user = yield call(() => axios.post(`user`));
    yield put(checkAuthSuccess(user.data));
  } catch (error) {
    console.log(error);
  }
}

export const checkAuthSuccess = user => ({ type: CHECK_AUTH_SUCCESS, payload: user });

export function* signUp(payload) {
  try {
    const newUser = { ...payload.userData, isAdmin: false }
    yield call(() => axios.post(`signup`, newUser));
    yield history.push('/sign-in');
    yield put(showSnackbar("Sign up successfully!"));
  } catch (error) {
    console.log(error);
    showSnackbar("Error!");
  }
}

export const signInSuccess = (data) => ({ type: SIGN_IN_SUCCESS, payload: data });

export function* logOut() {
  try {
    yield call(() => axios.get(`logout`));
    yield localStorage.removeItem('token');
    yield put(logOutSuccess());
    yield history.push('/');
    yield put(showSnackbar("You have successfully logged out!"));
  } catch (error) {
    console.log(error);
    showSnackbar("Error!");
  }
}

export const logOutSuccess = () => ({ type: LOG_OUT_SUCCESS });

export function* signIn(payload) {
  try {
    const { data } = yield call(() => axios.post(`login`, { ...payload.userData }));
    let token = data.token;
    token
      ? localStorage.setItem('token', token)
      : console.log('token not found');
    history.push('/');
    yield put(signInSuccess(data));
    yield put(showSnackbar("You have successfully logged in!"));
  } catch (error) {
    yield put(showSnackbar("Please, enter correct data!"));
  }
}
