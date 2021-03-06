import React, { Component } from 'react';
import { Link } from "react-router-dom";

import './styles.scss';


class MovieCard extends Component {
  render() {
    const { movie } = this.props;
    return (
      <div className="card">
        <Link to={{ pathname: `/film-profile/${movie.id}` }} className="card__link">
          <img
            className="card__media"
            src={movie.img}
            title={movie.name}
            alt={movie.name}
          />
        </Link>

        <div className="card__title">
          {movie.name}
        </div>

        <Link to={{ pathname: `/film-profile/${movie.id}` }} className="card__link">
          <button type="button" className="card__button">Buy ticket</button>
        </Link>
      </div>
    );
  }
}

export default MovieCard;
