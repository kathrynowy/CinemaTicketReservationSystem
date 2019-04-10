import React, { Component } from 'react';
import { connect } from "react-redux";

import { getMoviesAsync } from '../../actions/movies'
import { getSessionsAsync } from '../../actions/sessions'
import FilmProfile from '../../Components/FilmProfile/FilmProfile.js';
import { getCinemasAsync } from '../../actions/cinemas'

class FilmProfilePage extends Component {
  componentDidMount() {
    this.props.getSessionsAsync();
    this.props.getCinemasAsync();
    this.props.getMoviesAsync();
  }

  render() {
    return (
      this.props.sessions.length && this.props.movies.length &&
      this.props.cinemas.length &&
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
  getSessionsAsync() {
    dispatch(getSessionsAsync());
  },
  getCinemasAsync() {
    dispatch(getCinemasAsync());
  },
  getMoviesAsync() {
    dispatch(getMoviesAsync());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(FilmProfilePage);
