import React, { Component } from 'react';
import { connect } from "react-redux";

import { getMoviesAsync } from '../../actions/movies'
import { getSessionsAsync } from '../../actions/sessions'
import FilmProfile from '../../Components/FilmProfile/FilmProfile.js';
import { getCinemasAsync } from '../../actions/cinemas'
import Spinner from '../../Components/Spinner/Spinner';
import { showSpinner, hideSpinner } from '../../actions/spinner'

class FilmProfilePage extends Component {
  async componentDidMount() {
    this.props.showSpinner();
    await this.props.getSessionsAsync();
    await this.props.getCinemasAsync();
    await this.props.getMoviesAsync();
    this.props.hideSpinner();
  }

  render() {
    return (
      this.props.show
        ? <Spinner />
        : <FilmProfile
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
  movies: store.movies.movies,
  show: store.spinner.showSpinner
})

const mapDispatchToProps = dispatch => ({
  getSessionsAsync() {
    return dispatch(getSessionsAsync());
  },
  getCinemasAsync() {
    return dispatch(getCinemasAsync());
  },
  getMoviesAsync() {
    return dispatch(getMoviesAsync());
  },
  showSpinner() {
    dispatch(showSpinner());
  },
  hideSpinner() {
    dispatch(hideSpinner());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(FilmProfilePage);
