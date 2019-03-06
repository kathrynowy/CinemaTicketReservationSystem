import React, { Component } from 'react';
import PrimarySearchAppBar from '../../Components/PrimarySearchAppBar/PrimarySearchAppBar.js'
import FilmProfile from '../../Components/FilmProfile/FilmProfile.js';

class FilmProfilePage extends Component {
  render() {
    return (
      <div className="movie-profile-page">
        <FilmProfile idMovie={this.props.match.params.idMovie} />
      </div>
    );
  }
}

export default FilmProfilePage;

