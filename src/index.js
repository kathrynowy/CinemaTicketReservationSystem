import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { StripeProvider } from 'react-stripe-elements';
import createSagaMiddleware from 'redux-saga'

import configureSocket from './socket';
import axios from 'axios';
import { apiBaseUrl, stripeApiKey } from "./configs/config";
import rootReducer from "./reducers/index";
import App from './App';
import rootSaga from './sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, sagaMiddleware)));
sagaMiddleware.run(rootSaga)
export const socket = configureSocket(store.dispatch);
axios.defaults.baseURL = apiBaseUrl;


ReactDOM.render(
  <StripeProvider apiKey={stripeApiKey}>
    <Provider store={store}>
      <App />
    </Provider>
  </StripeProvider>,
  document.getElementById('root')
);
