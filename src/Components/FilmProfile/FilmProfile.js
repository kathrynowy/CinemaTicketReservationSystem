import React, { Component } from 'react';
import Schedule from './Schedule/Schedule'
import tickets from './Schedule/ScheduleData.js'
import Calendar from './Calendar/Calendar';
import './styles.scss';


class FilmProfile extends Component {
  render() {
    const { name, img, description } = this.props;
    return (
      <div className="container">

        <div className="movie-profile">
          <div className="movie-profile__name">{name} How to train your dragon 3</div>
          <div className="movie-profile__content">
            <img src="http://kino.bycard.by/public/timthumb.php?src=/public/images/1547642482drakon3.jpg&w=270&h=405&q=80&zc=1&a=c"/* {img} */ className="movie-profile__poster"></img>
            <div className="movie-profile__description">
              <span>Description</span>
              <p>{description}Когда-то викинги жили в гармонии с драконами. В те времена они делили радость, горе… и последние штаны. Казалось, что так будет всегда, но появление загадочной Дневной Фурии изменило жизнь острова. И теперь Иккинг и Беззубик столкнутся с безжалостным охотником на драконов, жаждущим уничтожить все, что им дорого.</p>
            </div>
          </div>
          <div className="movie-profile__tickets-info">
            <Calendar />
            {tickets.map((ticket) => <Schedule cinema={ticket.cinema} time={ticket.time} key={ticket.id} />)}
          </div>
        </div>
      </div >
    );
  }
}

export default FilmProfile;
