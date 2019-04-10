import { combineReducers } from "redux";

import ticketsList from './tickets';
import sessions from './sessions'
import additionalServices from './additionalServices'
import movies from './movies'
import cinemas from './cinemas'
import seats from './seats'
import users from './users'

const rootReducer = combineReducers({
  ticketsList,
  seats,
  sessions,
  additionalServices,
  movies,
  cinemas,
  users
});

export default rootReducer;
