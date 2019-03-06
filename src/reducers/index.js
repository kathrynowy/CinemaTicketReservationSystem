import { combineReducers } from "redux";

import selectTicket from './tickets';
import users from './users';

const rootReducer = combineReducers({
  selectTicket,
  users
});

export default rootReducer;