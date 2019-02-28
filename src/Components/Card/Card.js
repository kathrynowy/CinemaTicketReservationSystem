import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import './card.scss';


class MovieCard extends Component {
  render() {
    const { movie } = this.props;
    return (
      <div className="card">
        <img
          className="card__media"
          src={movie.img}
          title={movie.name}
        />
        <h3 className="card__title">
          {movie.name}
        </h3>
        <Button variant="contained" fullWidth color='primary' size="large" className="card__button">
          Buy ticket
        </Button>
      </div>
    );
  }
}

export default MovieCard;
