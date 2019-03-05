import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import './Card.scss';


class MovieCard extends Component {
  render() {
    const { movie } = this.props;
    const id = movie.id;
    return (
      <div className="card">
        <img
          className="card__media"
          src={movie.img}
          title={movie.name}
        />
        <div className="card__title">
          {movie.name}
        </div>
        <Link to={{
          pathname: `/film-profile/${id}`,
        }}>
          <input type="button" variant="contained" className="card__button" value="Buy ticket" />
        </Link>
      </div>
    );
  }
}

export default MovieCard;
