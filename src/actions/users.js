import {
  SIGN_IN_SUCCESS,
  CHECK_AUTH_SUCCESS,
  LOGOUT_SUCCESS
} from '../constans/actionTypes.js';

import axios from 'axios';
import { history } from '../App';
import { showSnackbar } from './snackbar'


export const checkAuth = () => {
  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = token;
  return async (dispatch) => {
    try {
      const user = await axios.post(`user`);
      dispatch(checkAuthSuccess(user.data));
    } catch (error) {
      console.log(error);
    }
  }
}

export const checkAuthSuccess = user => ({
  type: CHECK_AUTH_SUCCESS,
  payload: user
})


export const signUp = userData => {
  const newUser = { ...userData, isAdmin: false }
  return async (dispatch) => {
    try {
      await axios.post(`signup`, newUser);
      history.push('/sign-in');
      dispatch(showSnackbar("Sign up successfully!"));
    } catch (error) {
      console.log(error);
    }
  }
}

export const signInSuccess = () => ({
  type: SIGN_IN_SUCCESS
})

export const logOut = () => {
  return async dispatch => {
    try {
      await axios.get(`logout`);
      localStorage.removeItem('token');
      dispatch(logOutSuccess());
      history.push('/');
      dispatch(showSnackbar("You have successfully logged out!"));
    } catch (error) {
      console.log(error);
    }
  }
}

export const logOutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS
  }
}

export const signIn = userData => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`login`, { ...userData });
      let token = data.token;

      token
        ? localStorage.setItem('token', token)
        : console.log('token not found');

      history.push('/');
      dispatch(signInSuccess());
      dispatch(showSnackbar("You have successfully logged in!"));
    } catch (error) {
      dispatch(showSnackbar("Please, enter correct data!"));
    }
  }
}
