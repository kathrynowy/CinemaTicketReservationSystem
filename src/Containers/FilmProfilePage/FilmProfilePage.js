import React, { Component } from 'react';
import { connect } from "react-redux";

import { getSessionsAsync, getCinemasAsync, getMoviesAsync } from '../../actions/index.js'
import FilmProfile from '../../Components/FilmProfile/FilmProfile.js';
import tickets from '../../Sessions.js'
import cinemaData from '../../CinemaData';
import movieData from '../../movieData.js';


class FilmProfilePage extends Component {
  componentDidMount() {
    this.props.getSessionsAsync(tickets);
    this.props.getCinemasAsync(cinemaData);
    this.props.getMoviesAsync(movieData);
  }

  render() {
    return (
      this.props.sessions.length &&
      <FilmProfile
        movieId={this.props.match.params.movieId}
        sessions={this.props.sessions}
        cinemas={this.props.cinemas}
        movies={this.props.movies}
      />
    );
  }
}

const mapStateToProps = store => ({
  sessions: store.sessions.sessions,
  cinemas: store.cinemas.cinemas,
  movies: store.movies.movies
})

const mapDispatchToProps = dispatch => ({
  getSessionsAsync(sessions) {
    dispatch(getSessionsAsync(sessions));
  },
  getCinemasAsync(cinemas) {
    dispatch(getCinemasAsync(cinemas));
  },
  getMoviesAsync(movies) {
    dispatch(getMoviesAsync(movies));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(FilmProfilePage);
