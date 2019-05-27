import React, { Component } from 'react';
import { connect } from "react-redux";

import FilmProfile from '../../Components/FilmProfile/FilmProfile.js';
import Spinner from '../../Components/Spinner/Spinner';
import { showSpinner, hideSpinner } from '../../sagas/spinner';
import { GET_SESSIONS, GET_MOVIE, GET_CINEMAS } from '../../constans/actionTypes';


class FilmProfilePage extends Component {
  async componentDidMount() {
    this.props.showSpinner();
    await this.props.getMovieAsync(this.props.match.params.movieId);
    await this.props.getSessionsAsync();
    await this.props.getCinemasAsync();
    this.props.hideSpinner();
  }

  render() {
    return (
      this.props.isLoading
        ? <Spinner />
        : <FilmProfile
          movieId={this.props.match.params.movieId}
          sessions={this.props.sessions}
          cinemas={this.props.cinemas}
          movie={this.props.movie}
        />
    );
  }
}

const mapStateToProps = store => ({
  sessions: store.sessions.allSessions,
  cinemas: store.cinemas.allCinemas,
  movie: store.movies.movie,
  isLoading: store.spinner.isLoading
})

const mapDispatchToProps = dispatch => ({
  getSessionsAsync() {
    return dispatch({ type: GET_SESSIONS });
  },
  getCinemasAsync() {
    return dispatch({ type: GET_CINEMAS });
  },
  getMovieAsync(movieId) {
    return dispatch({ type: GET_MOVIE, movieId });
  },
  showSpinner() {
    dispatch(showSpinner());
  },
  hideSpinner() {
    dispatch(hideSpinner());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(FilmProfilePage);
