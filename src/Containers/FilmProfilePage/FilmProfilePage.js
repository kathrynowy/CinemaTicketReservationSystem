import React, { Component } from 'react';
import PrimarySearchAppBar from '../../Components/PrimarySearchAppBar/PrimarySearchAppBar.js'
import FilmProfile from '../../Components/FilmProfile/FilmProfile.js';
import tickets from '../../Sessions.js'
import { getSessionsAsync } from '../../actions/index.js'
import { connect } from "react-redux";
import store from '../../index.js';


class FilmProfilePage extends Component {
  componentDidMount() {
    this.props.getSessionsAsync(tickets);
  }
  render() {
    return (
      <div className="movie-profile-page"> {
        this.props.sessions.length && <FilmProfile idMovie={this.props.match.params.idMovie} sessions={this.props.sessions} />
      }
      </div>
    );
  }
}

const mapStateToProps = store => ({
  sessions: store.sessions.sessions,
  sessionsErrored: store.sessions.sessionErrored
})

const mapDispatchToProps = dispatch => ({
  getSessionsAsync(sessions) {
    dispatch(getSessionsAsync(sessions));
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(FilmProfilePage);

