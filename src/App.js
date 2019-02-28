import React, { Component } from 'react';
import PrimarySearchAppBar from './Components/PrimarySearchAppBar/PrimarySearchAppBar.js'

import Select from './Components/Select/Select.js'

import FilmProfile from './Components/FilmProfile/FilmProfile.js';
import SignIn from './Components/SignIn/SignIn.js'
import Hall from './Components/Hall/Hall.js'
import './App.scss';
import CardList from './Components/CardList/CardList.js';
import Main from './Components/Admin/Main/Main.js'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";




class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <PrimarySearchAppBar />
          <ul>
            <li>
              <Link to="/">CardList</Link>
            </li>
            <li>
              <Link to="/hall">Hall</Link>
            </li>
            <li>
              <Link to="/film-profile">FilmProfile</Link>
            </li>
            <li>
              <Link to="/main">Main</Link>
            </li>
          </ul>
          {/* <div className="container">
          <PrimarySearchAppBar />
          <Select />
          <CardList />
          <FilmProfile name="How to train your dragon 3" img='http://kino.bycard.by/public/timthumb.php?src=/public/images/1547642482drakon3.jpg&w=270&h=405&q=80&zc=1&a=c' description="Когда-то викинги жили в гармонии с драконами. В те времена они делили радость, горе… и последние штаны. Казалось, что так будет всегда, но появление загадочной Дневной Фурии изменило жизнь острова. И теперь Иккинг и Беззубик столкнутся с безжалостным охотником на драконов, жаждущим уничтожить все, что им дорого." />
          <SignIn />
          <Hall />
        </div> */}
          <hr />
          <Route exact path="/" component={CardList} />
          <Route path="/hall" component={Hall} />
          <Route path="/film-profile" component={FilmProfile} />
          <Route path="/main" component={Main} />
        </div>
      </Router>
    );
  }
}

export default App;
