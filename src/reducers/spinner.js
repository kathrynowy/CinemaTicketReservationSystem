import { SHOW_SPINNER, HIDE_SPINNER } from '../constans/actionTypes.js';


const initialState = {
  showSpinner: true
}

export default function spinner(state = initialState, action) {
  switch (action.type) {
    case SHOW_SPINNER:
      return Object.assign({}, state, {
        showSpinner: true
      })
    case HIDE_SPINNER:
      return Object.assign({}, state, {
        showSpinner: false
      })

    default: return state;
  }
}
