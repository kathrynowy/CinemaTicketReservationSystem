import React, { Component } from 'react';
import Divider from '@material-ui/core/Divider';
import './styles.scss';
import Schedule from './Schedule/Schedule'
import tickets from './Schedule/ScheduleData.js'
import Calendar from './Calendar/Calendar';

class BuyTicketPage extends Component {

  render() {
    return (
      <div className="movie-info">
        <hr className="divider" />
        <div className="movie-information-content to-left">
          <img src="https://media.pathe.nl/nocropthumb/180x254/gfx_content/other/api/filmdepot/v1/movie/download/19787_102960_ps_sd-high.jpg" className="movie-img"></img>
          <h3>Description</h3>
          <p> Когда-то викинги жили в гармонии с драконами. В те времена они делили радость, горе… и последние штаны. Казалось, что так будет всегда, но появление загадочной Дневной Фурии изменило жизнь острова. И теперь Иккинг и Беззубик столкнутся с безжалостным охотником на драконов, жаждущим уничтожить все, что им дорого.</p>
        </div>
        <div className="tickets-information-content to-left">
          <h2>Movie title</h2>
          <Calendar />
          {tickets.map((ticket) => <Schedule cinema={ticket.cinema} time={ticket.time} key={ticket.id} />)}
        </div>
      </div>
    );
  }
}

export default BuyTicketPage;