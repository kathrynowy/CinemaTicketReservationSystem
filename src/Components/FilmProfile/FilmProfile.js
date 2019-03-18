import React, { Component } from 'react';

import Schedule from './Schedule/Schedule.js'
import Calendar from './Calendar/Calendar';
import './styles.scss';


const DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;

class FilmProfile extends Component {
  state = {
    day: new Date().getTime(),
  }

  getCurrentTimes = (times, day) => {
    return times.filter((time) => +time > day && +time < (day + DAY_IN_MILLISECONDS))
  }

  selectDay = (day) => this.setState({ day })

  getCurrentSessions = (sessions, movieId, day) => {
    const newSessions = sessions.filter(session => session.movieId === movieId);
    return newSessions.map(session => {
      return (this.getCurrentTimes(session.times, day).length && <Schedule
        cinemaId={session.cinemaId}
        hallId={session.hallId}
        movieId={session.movieId}
        times={this.getCurrentTimes(session.times, day)}
        key={session.cinemaId + session.hallId + session.movieId}
        cinemas={this.props.cinemas}
      />) || ' '
    })
  }

  createDays = () => {
    const today = new Date().getTime();
    const days = [];
    for (let i = 0; i < 14; i++) {
      days.push(new Date(today + (DAY_IN_MILLISECONDS * i)));
    }
    return days;
  }

  render() {
    const days = this.createDays();
    const movieId = this.props.movieId;
    const movie = this.props.movies.find((movie) => movie._id === movieId)
    return (
      <div className="movie-profile">
        <div className="movie-profile__name"> {movie.name}</div>
        <div className="movie-profile__info">
          <div className="movie-profile__content">
            <img src={movie.img} className="movie-profile__poster" alt="movie"></img>
            <div className="movie-profile__description-container">
              <span className="movie-profile__title">Description </span>
              <p className="movie-profile__description">{movie.description}</p>
            </div>
          </div>
          <div className="movie-profile__tickets-info">
            <Calendar selectDay={this.selectDay} days={days} />
            {this.getCurrentSessions(this.props.sessions, movieId, this.state.day)}
          </div>
        </div>
      </div>
    );
  }
}

export default FilmProfile;
