import React, { Component } from "react";
import ScheduleIcon from '@material-ui/icons/Schedule';
import LocationIcon from '@material-ui/icons/LocationOn';
import { connect } from 'react-redux';

import { showSpinner, hideSpinner } from '../../actions/spinner';
import { getMovieAsync } from '../../actions/movies';
import { getCinemaAsync } from '../../actions/cinemas';
import { getHallAsync } from '../../actions/halls';
import './Ticket.scss';

const MILLISECONDS_IN_HOUR = 1000 * 3600;
const MILLISECONDS_IN_MINUTE = 1000 * 60;
const MINUTES_IN_HOUR = 60;

const OPTIONS_DATE = {
  weekday: 'short',
  day: '2-digit',
  month: 'long',
  year: 'numeric'
};

const OPTIONS_TIME = {
  hour: 'numeric',
  minute: 'numeric'
};

class Ticket extends Component {
  async componentDidMount() {
    await this.props.getMovieAsync(this.props.ticket.movieId);
    await this.props.getCinemaAsync(this.props.ticket.cinemaId);
    await this.props.getHallAsync(this.props.ticket.hallId);
  }

  getHours(milliseconds) {
    return Math.floor(milliseconds / MILLISECONDS_IN_HOUR);
  }

  getMinutes(milliseconds, hours) {
    return (milliseconds / MILLISECONDS_IN_MINUTE) - hours * MINUTES_IN_HOUR;
  }

  render() {
    const services = this.props.cinema.additionalServices || [];
    return (
      <div className="ticket">
        <div className="ticket__movie">
          <div className="ticket__movie-info">
            <img 
              className="ticket__poster" 
              src={this.props.movie.img}
              alt={this.props.movie.name}
            />
            <span className="ticket__movie-name">{this.props.movie.name}</span>
          </div>
          <div className="ticket__movie-duration">
            <ScheduleIcon className="ticket__icon" />
            <span className="ticket__time">
              {`${this.getHours(this.props.movie.runningTime)}h 
              ${this.getMinutes(this.props.movie.runningTime, this.getHours(this.props.movie.runningTime))}m`}
            </span>
          </div>
        </div>

        <div className="ticket__container">
          <div className="ticket__cinema cinema">
            <div className="cinema__info">
              <span className="cinema__name">{this.props.cinema.name}</span>
              <span className="cinema__hall">{this.props.hall.name}</span>
              <span className="cinema__seat">{this.props.ticket.seat}</span>
              <span className="cinema__row">{this.props.ticket.row}</span>
            </div>

            <div className="cinema__labels">
              <span className="cinema__name">cinema</span>
              <span className="cinema__hall">hall</span>
              <span className="cinema__seat">seat</span>
              <span className="cinema__row">row</span>
            </div>

            <div className="cinema__date"> {`
              ${new Date(+this.props.ticket.time).toLocaleString('en', OPTIONS_DATE)},
              ${new Date(+this.props.ticket.time).toLocaleString('en', OPTIONS_TIME)}
            `} </div>
            <div className="cinema__date_label">Date and Time</div>

            <div className="cinema__location">
              <LocationIcon className="cinema__icon" />
              <div className="cinema__city">{this.props.cinema.city}</div>
            </div>
          </div>
          {
            (this.props.ticket.selectedServices.length && this.props.cinema.additionalServices)
              ? <div className="ticket__services">
                <span className="ticket__services-label">Additional services</span>
                {
                  this.props.ticket.selectedServices.map(index => {
                    return (
                      <div className="ticket__service service">
                        <div className="service__name">{services[index].name}</div>
                        <div className="service__cost">{services[index].cost}$</div>
                      </div>
                    )
                  })
                }
              </div>
              : ''
          }
        </div>

        <div className="ticket__total-amount total-amount">
          <span className="total-amount__label">Total amount</span>
          <span className="total-amount__cost">{this.props.ticket.cost}$</span>
        </div>
      </div>
    );
  }
}


const mapStateToProps = store => ({
  movie: store.movies.movie,
  cinema: store.cinemas.cinema,
  hall: store.halls.hall
})

const mapDispatchToProps = dispatch => ({
  getHallAsync(id) {
    return dispatch(getHallAsync(id));
  },
  getMovieAsync(id) {
    return dispatch(getMovieAsync(id));
  },
  getCinemaAsync(id) {
    return dispatch(getCinemaAsync(id));
  },
  showSpinner() {
    dispatch(showSpinner());
  },
  hideSpinner() {
    dispatch(hideSpinner());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Ticket);
