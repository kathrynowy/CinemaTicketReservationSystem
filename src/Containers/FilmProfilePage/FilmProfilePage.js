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
    this.props.getCinemasAsync();
    this.props.getMoviesAsync();
  }

  render() {
    return (
      this.props.sessions.length && this.props.movies.length &&
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
  getCinemasAsync() {
    dispatch(getCinemasAsync());
  },
  getMoviesAsync() {
    dispatch(getMoviesAsync());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(FilmProfilePage);
