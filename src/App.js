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
            <BuyTicketPage name="How to train your dragon 3" img='http://kino.bycard.by/public/timthumb.php?src=/public/images/1547642482drakon3.jpg&w=270&h=405&q=80&zc=1&a=c' description="Когда-то викинги жили в гармонии с драконами. В те времена они делили радость, горе… и последние штаны. Казалось, что так будет всегда, но появление загадочной Дневной Фурии изменило жизнь острова. И теперь Иккинг и Беззубик столкнутся с безжалостным охотником на драконов, жаждущим уничтожить все, что им дорого." />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
