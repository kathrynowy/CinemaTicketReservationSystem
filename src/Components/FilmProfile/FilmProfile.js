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
          <div className="movie-profile__name">{name}</div>
          <div className="movie-profile__content">
            <img src={img} className="movie-profile__poster"></img>
            <div className="movie-profile__description">
              <span>Description</span>
              <p>{description}</p>
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
