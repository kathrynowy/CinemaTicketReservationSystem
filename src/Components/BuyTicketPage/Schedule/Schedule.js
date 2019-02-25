import React, { Component } from 'react';
import './Schedule.scss';

class Schedule extends Component {
  render() {
    const { cinema, time } = this.props;
    return (
      <div className="schedule">
        <div className="schedule-cinema">{cinema}</div>
        <div className="schedule-space"></div>
        <div className="schedule-tickets">
          {time.map((time) => <a key={time} >{time}</a>)}
        </div>
      </div>
    );
  }
}

export default Schedule;