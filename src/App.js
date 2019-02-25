import React, { Component } from 'react';
import PrimarySearchAppBar from './Components/PrimarySearchAppBar/PrimarySearchAppBar.js'
import Card from './Components/Card/Card'
import Select from './Components/Select/Select.js'
import './App.scss';
import movieData from './movieData.js'
import BuyTicketPage from './Components/BuyTicketPage/BuyTicketPage.js';


class App extends Component {
  render() {
    return (
      <div className="container">
        <PrimarySearchAppBar />
        <div className='container'>
          <Select />
          <div className='cardsContainer'>
            {movieData.map((movie) => <Card movie={movie} key={movie.id} />)}
          </div>
          <div className="film-container">
            <BuyTicketPage />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
