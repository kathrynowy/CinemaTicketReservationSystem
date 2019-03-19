import React, { Component } from 'react';
import { Link } from "react-router-dom";

import './styles.scss';


class MovieCard extends Component {
  render() {
    const { movie } = this.props;
    return (
      <div className="card">
        <img
          className="card__media"
          src={movie.img}
          title={movie.name}
          alt={movie.name}
        />
        <div className="card__title">
          {movie.name}
        </div>
        <Link to={{
          pathname: `/film-profile/${movie.id}`,
        }}>
          <input type="button" className="card__button" value="Buy ticket" />
        </Link>
      </div>
    );
  }
}

export default MovieCard;
