import { combineReducers } from "redux";

import ticketsList from './tickets';
import sessions from './sessions'
import additionalServices from './additionalServices'
import movies from './movies'
import cinemas from './cinemas'

const rootReducer = combineReducers({
  ticketsList,
  sessions,
  additionalServices,
  movies,
  cinemas
});

export default rootReducer;
