import React, { Component } from 'react';
import './Schedule.scss';


class Schedule extends Component {
  render() {
    const { cinema, time } = this.props;
    return (
      <div className="schedule">
        <div className="schedule__cinema">{cinema}</div>
        <div className="schedule__space"></div>
        <div className="schedule__ticket-list">
          {time.map((time) => <a className="schedule__ticket" key={time}>{time}</a>)}
        </div>
      </div>
    );
  }
}

export default Schedule;
