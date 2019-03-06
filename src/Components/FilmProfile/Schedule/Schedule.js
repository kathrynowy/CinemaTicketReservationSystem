import React, { Component } from 'react';
import './Schedule.scss';
import { Link } from "react-router-dom";
import cinemaData from '../../../CinemaData.js';


class Schedule extends Component {
  render() {
    const { idCinema, times, idHall, idMovie } = this.props;
    return (
      <div className="schedule">

        <div className="schedule__cinema">{(cinemaData.find(cinema => cinema.id == idCinema)).name}</div>
        <div className="schedule__space"></div>
        <div className="schedule__ticket-list">
          {times.map((time) => <Link to={{
            pathname: `/hall/${idCinema}/${idMovie}/${idHall}/${time}`
          }}
            key={time} className="schedule__ticket"> <span className="schedule__time">{new Date(+time).getHours() + ':' + new Date(+time).getMinutes()}</span> <div className="schedule_ticket"></div></Link>)}
        </div>
      </div>
    );
  }
}

export default Schedule;