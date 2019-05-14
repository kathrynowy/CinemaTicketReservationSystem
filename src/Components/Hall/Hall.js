import React, { Component } from 'react';

import SelectSeats from './SelectSeats/SelectSeats.js'
import SeatsInfo from './SeatsInfo/SeatsInfo.js'
import './Hall.scss';
import ScheduleIcon from '@material-ui/icons/Schedule';
import LocationIcon from '@material-ui/icons/LocationOn';
import EventIcon from '@material-ui/icons/Event';
import HallIcon from '@material-ui/icons/BorderAll';

const OPTIONS_DATE = {
  weekday: 'short',
  day: '2-digit',
  month: 'numeric',
  year: 'numeric'
};

const OPTIONS_TIME = {
  hour: 'numeric',
  minute: 'numeric'
};

class Hall extends Component {
  render() {
    const { time, cinema, movie, hall } = this.props;
    return (
      <div className="hall-container">
        <div className="hall-info">
          <div className="session-info">
            <img
              className="session-info__poster"
              src={movie.img}
              alt={movie.name}
            />
            <div className="session-info__container info">
              <div className="info__movie">{movie.name}</div>
              <div className="info__date">
                <EventIcon className="info__icon" />
                {new Date(+time).toLocaleString('en', OPTIONS_DATE)}
              </div>
              <div className="info__time">
                <ScheduleIcon className="info__icon" />
                {new Date(+time).toLocaleString('en', OPTIONS_TIME)}
              </div>
              <div className="info__location">
                <LocationIcon className="info__icon" />
                {cinema.name}
              </div>
              <div className="info__hall">
                <HallIcon className="info__icon" />
                hall: {hall.name}
              </div>
            </div>
          </div>

          <div className="hall">
            <div className="hall__screen"></div>
            <div className="hall__screen-shadow"></div>
            <SelectSeats
              toggleSeat={this.props.onToggleSeat}
              selectedSeats={this.props.selectedSeats}
              boughtSeats={this.props.boughtSeats}
              cinemaId={cinema.id}
              movieId={movie.id}
              hallId={hall.id}
              time={time}
              seats={this.props.seats.hall}
            />{/* seatsmap */}
            <div className="hall-legend">
              <div className="hall-legend__seat-type hall-legend__seat-type_free">
                <div className="hall-legend__icon hall-legend__icon_free"></div>
                <span className="hall-legend__text">free</span>
              </div>
              <div className="hall-legend__seat-type hall-legend__seat-type_selected">
                <div className="hall-legend__icon hall-legend__icon_selected"></div>
                <span className="hall-legend__text">selected</span>
              </div>
              <div className="hall-legend__seat-type hall-legend__seat-type_bought">
                <div className="hall-legend__icon hall-legend__icon_bought"></div>
                <span className="hall-legend__text">bought</span>
              </div>
            </div>
          </div>
        </div>
        <div className="seats-information">
          <SeatsInfo
            selectedSeats={this.props.selectedSeats}
            cinemaId={cinema.id}
            movieId={movie.id}
            hallId={hall.id}
            time={time}
            clearInterval={this.props.clearInterval}
          />
        </div>
      </div>
    );
  }
}

export default Hall;
