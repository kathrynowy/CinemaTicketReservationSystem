import { combineReducers } from "redux";

import selectTicket from './tickets';
import users from './users';
import sessions from './sessions'

const rootReducer = combineReducers({
  selectTicket,
  users,
  sessions
});

export default rootReducer;