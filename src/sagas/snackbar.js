import { SHOW_SNACKBAR, HIDE_SNACKBAR } from '../constans/actionTypes.js';


export const showSnackbar = message => {
  return {
    type: SHOW_SNACKBAR,
    message
  }
}

export const hideSnackbar = () => {
  return {
    type: HIDE_SNACKBAR
  }
}
