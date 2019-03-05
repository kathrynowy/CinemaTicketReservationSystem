import React, { Component } from 'react';
import Schedule from './Schedule/Schedule'
import tickets from './Schedule/ScheduleData.js'
import Calendar from './Calendar/Calendar';
import queryString from 'query-string'
import './styles.scss';
import movieData from '../../movieData.js'


class FilmProfile extends Component {

  state = {
    day: new Date().getTime() + (3 * 60 * 60 * 1000),
    times: [],
  }

  getSecondsToday = () => {
    const date = new Date();
    return date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
  };

  currentTimes = (times) => {
    return times.filter((time) => +time > this.state.day && +time < (this.state.day + 86400000))
  }

  selectDay = (day) => {
    this.setState({
      day: day.getTime()
    })
  }

  createDays = () => {
    const DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
    const today = new Date();
    const days = [];
    for (let i = 0; i < 14; i++) {
      days.push(new Date(today.getTime() + (DAY_IN_MILLISECONDS * i) + (3 * 60 * 60 * 1000) - this.getSecondsToday()));
    }
    return days;
  }

  render() {
    const days = this.createDays();
    const movieId = this.props.id;
    const movie = movieData.find((movie) => movie.id === movieId)
    return (
      <div className="container">

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
            {
              tickets.map((ticket) =>

                ((this.currentTimes(ticket.times).length != 0) && <Schedule cinema={ticket.cinema} times={this.currentTimes(ticket.times)} key={ticket.id} />)

              )
            }
          </div>
        </div>
      </div >
    );
  }
}

export default FilmProfile;
