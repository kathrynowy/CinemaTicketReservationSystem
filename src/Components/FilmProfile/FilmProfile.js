import React, { Component } from 'react';
import Schedule from './Schedule/Schedule.js'
import Calendar from './Calendar/Calendar';
import './styles.scss';
import movieData from '../../movieData.js'


import { connect } from "react-redux";



class FilmProfile extends Component {
  state = {
    day: new Date().getTime() + 1000 * 60 * 60 * 3,
  }

  getSecondsToday = () => {
    const date = new Date();
    return date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
  };

  currentTimes = (times, day) => {
    return times.filter((time) => +time > day && +time < (day + 86400000))
  }

  selectDay = (day) => {
    this.setState({
      day
    })
  }

  currentSessions = (sessions, movieId, day) => {
    const newSessions = sessions.filter(session => session.movieId == movieId);
    return newSessions.map(session => 
      (this.currentTimes(session.times, day).length !== 0) && <Schedule 
        cinemaId={session.cinemaId} 
        hallId={session.hallId} 
        movieId={session.movieId} 
        times={this.currentTimes(session.times, day)} 
        key={Math.random()}
      />
    )
  }

  createDays = () => {
    const DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
    const secondsToday =  this.getSecondsToday();
    const today = new Date().getTime();
    const days = [];
    for (let i = 0; i < 14; i++) {
      days.push(new Date(today -  + (DAY_IN_MILLISECONDS * i)));
    }
    return days;
  }

  render() {
    const days = this.createDays();

    const movieId = this.props.movieId;
    const movie = movieData.find((movie) => movie.id === movieId)
    return (
        <div className="movie-profile">
          <div className="movie-profile__name"> {movie.name}</div>
          <div className="movie-profile__content">
            <img src={movie.img} className="movie-profile__poster" alt="movie"></img>
            <div className="movie-profile__description">
              <span>Description </span>
              <p>{movie.description}</p>
            </div>
          </div>
          <div className="movie-profile__tickets-info">
            <Calendar selectDay={this.selectDay} days={days} />
            {this.currentSessions(this.props.sessions, movieId, this.state.day)}
          </div>
        </div>
    );
  }
}


export default FilmProfile;