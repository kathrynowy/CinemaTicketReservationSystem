import React, { Component } from 'react';
import './Schedule.scss';
import { Link } from "react-router-dom";

const OPTIONS_TIME = {
  hour: 'numeric',
  minute: 'numeric',
  hour12: false
};

class Schedule extends Component {
  render() {
    const { cinemaId, times, hallId, movieId, cinemas } = this.props;
    return (
      times.length
        ? (
          <div className="schedule">
            <div className="schedule__cinema">{(cinemas.find(cinema => cinema.id === cinemaId)).name}</div>
            <div className="schedule__ticket-list">
              {
                times.map((time) =>
                  <Link to={{ pathname: `/hall/${cinemaId}/${movieId}/${hallId}/${time}` }}
                    key={time}
                    className="schedule__ticket"
                  >
                    <span className="schedule__time">
                      {new Date(+time).toLocaleString('en', OPTIONS_TIME)}
                    </span>
                    <div className="schedule_ticket"></div>
                  </Link>
                )
              }
            </div>
          </div>
        )
        : ''
    );
  }
}

export default Schedule;
