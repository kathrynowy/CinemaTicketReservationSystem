import React, { Component } from 'react';
import './Schedule.scss';
import { Link } from "react-router-dom";
import Tooltip from '@material-ui/core/Tooltip';

const OPTIONS_TIME = {
  hour: 'numeric',
  minute: 'numeric',
  hour12: false
};


class Schedule extends Component {
  render() {
    const { sessions } = this.props;
    return (
      sessions.length
        ? <div className="schedule">
          <div className="schedule__cinema">{sessions[0].cinemaId.name || ''}</div>
          <div className="schedule__ticket-list">
            {
              sessions.map(session =>
                <Tooltip title={session.hallId.name} key={session.time + session.hallId.id}>
                  <Link to={`/hall/${session.cinemaId.id}/${session.movieId.id}/${session.hallId.id}/${session.time}`}
                    className="schedule__ticket"
                  >
                    <span className="schedule__time">
                      {new Date(+session.time).toLocaleString('en', OPTIONS_TIME)}
                    </span>
                    <div className="schedule_ticket"></div>
                  </Link>
                </Tooltip>
              )
            }
          </div>
        </div>
        : ''
    );
  }
}

export default Schedule;
