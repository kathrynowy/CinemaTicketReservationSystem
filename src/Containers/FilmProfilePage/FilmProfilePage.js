import React, { Component } from 'react';
import PrimarySearchAppBar from '../../Components/PrimarySearchAppBar/PrimarySearchAppBar.js'
import FilmProfile from '../../Components/FilmProfile/FilmProfile.js';

class FilmProfilePage extends Component {
  render() {
    return (
      <div className="movie-profile-page">
        <FilmProfile />
      </div>
    );
  }
}

export default FilmProfilePage;

