import React, { Component, Fragment } from 'react';
import { Router, Route, Switch } from "react-router-dom";
import createBrowseHistory from "history/createBrowserHistory";
import { connect } from "react-redux";

import { checkAuth, logOutSuccess, signInSuccess } from './actions/users';
import SignIn from './Components/SignIn/SignIn.js'
import PrimarySearchAppBar from './Components/PrimarySearchAppBar/PrimarySearchAppBar.js'
import MainPage from './Containers/MainPage/MainPage.js';
import FilmProfilePage from './Containers/FilmProfilePage/FilmProfilePage.js';
import HallPage from './Containers/HallPage/HallPage.js';
import SignUp from './Components/SignUp/SignUp.js';
import ConfirmTicketsPage from './Containers/ConfirmTicketsPage/ConfirmTicketsPage.js';
import './App.scss';
import SideDrawer from './Components/SideDrawer/SideDrawer';
import Backdrop from './Components/Backdrop/Backdrop';
import CustomSnackbar from './Components/Snackbar/Snackbar.js';
import UserPage from './Components/UserPage/UserPage.js';
import { showSnackbar } from './actions/snackbar';

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

  componentDidMount() {
    window.addEventListener('storage', event => {
      if (event.key === "token") {
        if (event.newValue === null) {
          history.push('/');
          this.props.logOutSuccess();
        } else {
          this.props.signInSuccess();
          history.push('/');
        }
      }
    })
  }

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };

  checkAuth = () => {
    return this.props.isUserLoggedIn || localStorage.getItem('token');
  }

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
            <CustomSnackbar isSnackbarOpen={this.props.isSnackbarOpen} message={this.props.message} />
            <SideDrawer show={this.state.sideDrawerOpen} />
            {backdrop}
            <Switch>
              <Route exact path="/" component={MainPage} />
              <Route path="/film-profile/:movieId" component={FilmProfilePage} />
              <Route path="/hall/:cinemaId/:movieId/:hallId/:time" component={this.checkAuth() ? HallPage : SignIn} />
              <Route path="/sign-in" component={SignIn} />
              <Route path="/sign-up" component={SignUp} />
              <Route path="/confirm-ticket/:cinemaId/:movieId/:hallId/:time" component={this.checkAuth() ? ConfirmTicketsPage : SignIn} />
              <Route path="/profile" component={this.checkAuth() ? UserPage : SignIn} />
            </Switch>
          </div>
        </Router>
      </Fragment>
    );
  }
}

const mapStateToProps = store => ({
  currentUser: store.users.currentUser,
  isSnackbarOpen: store.snackbar.isSnackbarOpen,
  message: store.snackbar.message,
  isUserLoggedIn: store.users.isUserLoggedIn
})

const mapDispatchToProps = dispatch => ({
  checkAuth() {
    return dispatch(checkAuth());
  },
  logOutSuccess() {
    dispatch(logOutSuccess());
    dispatch(showSnackbar("You have successfully logged out!"));
  },
  signInSuccess() {
    dispatch(signInSuccess());
    dispatch(showSnackbar("You have successfully logged in!"));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
