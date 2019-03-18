import { combineReducers } from "redux";

import ticketsList from './tickets';
import sessions from './sessions'
import additionalServices from './additionalServices'
import movies from './movies'
import cinemas from './cinemas'
import seats from './seats'

const rootReducer = combineReducers({
  ticketsList,
  seats,
  sessions,
  additionalServices,
  movies,
  cinemas
});

export default rootReducer;
