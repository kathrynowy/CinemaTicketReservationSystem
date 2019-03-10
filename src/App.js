import React, { Component, Fragment } from 'react';
import SignIn from './Components/SignIn/SignIn.js'
import PrimarySearchAppBar from './Components/PrimarySearchAppBar/PrimarySearchAppBar.js'
import { BrowserRouter as Router, Route} from "react-router-dom";
import MainPage from './Containers/MainPage/MainPage.js';
import FilmProfilePage from './Containers/FilmProfilePage/FilmProfilePage.js';
import HallPage from './Containers/HallPage/HallPage.js';
import SignUp from './Components/SignUp/SignUp.js';
import './App.scss';
import ConfirmTicketsPage from './Containers/ConfirmTicketsPage/ConfirmTicketsPage.js';


class App extends Component {
  render() {
    return (
      <Fragment>
        <PrimarySearchAppBar />
        <Router >
          <div className="container">
            {/* <ul> 
                <li> 
                <Link to="/">Main Page</Link> 
                </li> 
                <li> 
                <Link to="/hall">Movie Profile</Link> 
                </li> 
                <li> 
                <Link to="/film-profile">Film Profile</Link> 
                </li> 
                <li> 
                <Link to="/main">Main</Link> 
                </li> 
                <li> 
                <Link to="/sign-in">Sign in</Link> 
                </li> 
                <li> 
                <Link to="/sign-up">Sign up</Link> 
                </li> 
                </ul> 
                <hr /> */}
            <Route exact path="/" component={MainPage} />
            <Route path="/film-profile/:movieId" component={FilmProfilePage} />
            <Route path="/hall/:cinemaId/:movieId/:hallId/:time" component={HallPage} />
            <Route path="/sign-in" component={SignIn} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/confirm-ticket" component={ConfirmTicketsPage} />
          </div>
        </Router>
      </Fragment>
    );
  }
}

export default App;