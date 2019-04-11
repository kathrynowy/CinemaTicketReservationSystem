import React, { Component, Fragment } from 'react';
import { Router, Route, Link, Switch, Redirect } from "react-router-dom";
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
import CustomSnackbar from './Components/Snackbar/Snackbar.js';
import UserPage from './Components/UserPage/UserPage.js';



export const history = createBrowseHistory();

class App extends Component {
  state = {
    sideDrawerOpen: false
  };

  drawToggleClickHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };

  checkAuth = () => {
    return localStorage.getItem('token');
  }

  render() {
    let backdrop;

    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }

    return (
      <Fragment>
        <Router history={history}>
          <Switch>
            <div className="container">
              <PrimarySearchAppBar click={this.drawToggleClickHandler} />
              <CustomSnackbar isSnackbarOpen={this.props.isSnackbarOpen} message={this.props.message} />
              <SideDrawer show={this.state.sideDrawerOpen} />
              {backdrop}
              <Route exact path="/" component={MainPage} />
              <Route path="/film-profile/:movieId" component={FilmProfilePage} />
              <Route path="/hall/:cinemaId/:movieId/:hallId/:time" component={this.checkAuth() ? HallPage : SignIn} />
              <Route path="/sign-in" component={SignIn} />
              <Route path="/sign-up" component={SignUp} />
              <Route path="/confirm-ticket/:cinemaId/:movieId/:hallId/:time" component={this.checkAuth() ? ConfirmTicketsPage : SignIn} />
              <Route path="/profile" component={this.checkAuth() ? UserPage : SignIn} />
            </div>
          </Switch>
        </Router>
      </Fragment>
    );
  }
}

const mapStateToProps = store => ({
  isUserLoggedIn: store.users.isUserLoggedIn,
  currentUser: store.users.currentUser,
  isSnackbarOpen: store.snackbar.isSnackbarOpen,
  message: store.snackbar.message
})

const mapDispatchToProps = dispatch => ({
  checkAuth() {
    return dispatch(checkAuth());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
