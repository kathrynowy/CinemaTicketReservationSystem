import React, { Component } from 'react';
import SignIn from './Components/SignIn/SignIn.js'
import Hall from './Components/Hall/Hall.js'
import './App.scss';
import Main from './Components/Admin/Main/Main.js'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import MainPage from './Containers/MainPage/MainPage.js';
import FilmProfilePage from './Containers/FilmProfilePage/FilmProfilePage.js';
import HallPage from './Containers/HallPage/HallPage.js';


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
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
          </ul>
          <hr />

          <Route exact path="/" component={MainPage} />
          <Route path="/film-profile" component={FilmProfilePage} />
          <Route path="/hall" component={HallPage} />
          <Route path="/main" component={Main} />
          <Route path="/sign-in" component={SignIn} />
        </div>
      </Router>
    );
  }
}

export default App;
