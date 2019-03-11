import React, { Component } from 'react';
import FilmProfile from '../../Components/FilmProfile/FilmProfile.js';
import tickets from '../../Sessions.js'
import { getSessionsAsync, getCinemasAsync } from '../../actions/index.js'
import { connect } from "react-redux";
import cinemaData from '../../CinemaData';


class FilmProfilePage extends Component {
  componentDidMount() {
    this.props.getSessionsAsync(tickets);
    this.props.getCinemasAsync(cinemaData);
  }

  render() {
    return (
      this.props.sessions.length &&
      <FilmProfile
        movieId={this.props.match.params.movieId}
        sessions={this.props.sessions}
        cinemas={this.props.cinemas}
      />
    );
  }
}

const mapStateToProps = store => ({
  sessions: store.sessions.sessions,
  sessionsErrored: store.sessions.sessionErrored,
  cinemas: store.cinemas.cinemas,
  cinemasErorred: store.sessions.cinemasErrored
})

const mapDispatchToProps = dispatch => ({
  getSessionsAsync(sessions) {
    dispatch(getSessionsAsync(sessions));
  },
  getCinemasAsync(cinemas) {
    dispatch(getCinemasAsync(cinemas));
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(FilmProfilePage);

