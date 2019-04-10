import React, { Component, Fragment } from 'react';
import { Router, Route, Link } from "react-router-dom";
import createBrowseHistory from "history/createBrowserHistory";
import { connect } from "react-redux";

import SignIn from './Components/SignIn/SignIn.js'
import PrimarySearchAppBar from './Components/PrimarySearchAppBar/PrimarySearchAppBar.js'
import MainPage from './Containers/MainPage/MainPage.js';
import FilmProfilePage from './Containers/FilmProfilePage/FilmProfilePage.js';
import HallPage from './Containers/HallPage/HallPage.js';
import SignUp from './Components/SignUp/SignUp.js';
import ConfirmTicketsPage from './Containers/ConfirmTicketsPage/ConfirmTicketsPage.js';
import './App.scss';
import SideDrawer from './Components/SideDrawer/SideDrawer'
import Backdrop from './Components/Backdrop/Backdrop';

import { checkAuth } from './actions/users';


export const history = createBrowseHistory();

class App extends Component {
  state = {
    sideDrawerOpen: false,
    isTokenExist: localStorage.getItem('token')
  };

  drawToggleClickHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };

  render() {
    let backdrop;

    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }

    return (
      <Fragment>
        <Router history={history}>
          <div className="container">
            <PrimarySearchAppBar click={this.drawToggleClickHandler} />
            <SideDrawer show={this.state.sideDrawerOpen} />
            {backdrop}
            <Route exact path="/" component={MainPage} />
            <Route path="/film-profile/:movieId" component={FilmProfilePage} />
            <Route path="/hall/:cinemaId/:movieId/:hallId/:time" component={this.state.isTokenExist ? HallPage : SignIn} />
            <Route path="/sign-in" component={SignIn} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/confirm-ticket/:cinemaId/:movieId/:hallId/:time" component={this.state.isTokenExist ? ConfirmTicketsPage : SignIn} />
          </div>
        </Router>
      </Fragment>
    );
  }
}

const mapStateToProps = store => ({
  isUserLoggedIn: store.users.isUserLoggedIn
})

const mapDispatchToProps = dispatch => ({
  checkAuth() {
    dispatch(checkAuth());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
