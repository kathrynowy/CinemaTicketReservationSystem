import { SHOW_SPINNER, HIDE_SPINNER } from '../constans/actionTypes.js';


const initialState = {
  isLoading: true
}

export default function spinner(state = initialState, action) {
  switch (action.type) {
    case SHOW_SPINNER:
      return Object.assign({}, state, {
        isLoading: true
      })

    case HIDE_SPINNER:
      return Object.assign({}, state, {
        isLoading: false
      })

    default: return state;
  }
}
