import React, { Component, Fragment } from 'react';
import { Router, Route } from "react-router-dom";
import createBrowseHistory from "history/createBrowserHistory";

import SignIn from './Components/SignIn/SignIn.js'
import PrimarySearchAppBar from './Components/PrimarySearchAppBar/PrimarySearchAppBar.js'
import MainPage from './Containers/MainPage/MainPage.js';
import FilmProfilePage from './Containers/FilmProfilePage/FilmProfilePage.js';
import HallPage from './Containers/HallPage/HallPage.js';
import SignUp from './Components/SignUp/SignUp.js';
import ConfirmTicketsPage from './Containers/ConfirmTicketsPage/ConfirmTicketsPage.js';
import './App.scss';



export const history = createBrowseHistory();

class App extends Component {
  render() {
    return (
      <Fragment>
        <PrimarySearchAppBar />
        <Router history={history}>
          <div className="container">
            <Route exact path="/" component={MainPage} />
            <Route path="/film-profile/:movieId" component={FilmProfilePage} />
            <Route path="/hall/:cinemaId/:movieId/:hallId/:time" component={HallPage} />
            <Route path="/sign-in" component={SignIn} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/confirm-ticket/:cinemaId/:movieId/:hallId/:time" component={ConfirmTicketsPage} />
          </div>
        </Router>
      </Fragment>
    );
  }
}

export default App;
