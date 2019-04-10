import {
  SIGN_IN_SUCCESS
} from '../constans/actionTypes.js';
import axios from 'axios';
import { history } from '../App';

axios.defaults.baseURL = 'http://localhost:8080/';


export const checkAuth = () => {
  return async (dispatch) => {
    try {
      const userId = localStorage.getItem('userId');
      await axios.post(`user/${userId}`);
      dispatch(signInSuccess());

    } catch (error) {
      console.log(error);
    }
  }
}

export const signUp = userData => {
  return async (dispatch) => {
    try {
      await axios.post(`signup`, userData);
      history.push('/sign-in');
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

      localStorage.setItem('token', '');
      localStorage.setItem('userId', '');

      history.push('/');

    } catch (error) {
      console.log(error);
    }
  }
}

export const signIn = userData => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`login`, { ...userData });
      let token = data.token;
      let userId = data.id;
      let email = data.email;

      token
        ? localStorage.setItem('token', token)
        : console.log('token not found');

      userId
        ? localStorage.setItem('userId', userId)
        : console.log('user id not found');

      history.push('/');
      dispatch(signInSuccess());
    } catch (error) {
      console.log(error);
    }
  }
}
