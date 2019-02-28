import React, { Component } from 'react';
import Schedule from './Schedule/Schedule'
import tickets from './Schedule/ScheduleData.js'
import Calendar from './Calendar/Calendar';
import './styles.scss';


class FilmProfile extends Component {
  render() {
    const { name, img, description } = this.props;
    return (
      <div className="movie-profile">
        <div className="movie-profile__content to-left">
          <img src={img} className="movie-profile__poster"></img>
          <div className="movie-profile__description">
            <h3>Description</h3>
            <p>{description}</p>
          </div>
        </div>
        <div className="movie-profile__tickets-info to-left">
          <h2>{name}</h2>
          <Calendar />
          {tickets.map((ticket) => <Schedule cinema={ticket.cinema} time={ticket.time} key={ticket.id} />)}
        </div>
      </div>
    );
  }
}

export default FilmProfile;
