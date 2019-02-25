import React, { Component } from 'react';
import Schedule from './Schedule/Schedule'
import tickets from './Schedule/ScheduleData.js'
import Calendar from './Calendar/Calendar';
import MovieData from '../../movieData.js'
import './styles.scss';

class DisplayInfo extends Component {
  render() {
    const { name, img, description } = this.props;
    return (
      <div className="movie-info">
        <hr className="divider" />
        <div className="movie-information-content to-left">
          <img src={img} className="movie-img"></img>
          <h3>Description</h3>
          <p>{description}</p>
        </div>
        <div className="tickets-information-content to-left">
          <h2>{name}</h2>
          <Calendar />
          {tickets.map((ticket) => <Schedule cinema={ticket.cinema} time={ticket.time} id={ticket.id} />)}
        </div>
      </div>
    );
  }
}

