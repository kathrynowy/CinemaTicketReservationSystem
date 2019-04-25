import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import axios from 'axios';
import { apiBaseUrl } from "./configs/config";

import configureSocket from './socket';
import rootReducer from "./reducers/index";
import App from './App';
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
export const socket = configureSocket(store.dispatch);
axios.defaults.baseURL = apiBaseUrl;


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
