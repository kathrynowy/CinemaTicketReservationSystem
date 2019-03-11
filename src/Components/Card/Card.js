import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import './card.scss';


class MovieCard extends Component {
  render() {
    const { movie } = this.props;
    return (
      <div className="cardContainer">
        <div className="card">
          <img
            className="mediaa"
            src={movie.img}
            title="Contemplative Reptile"
          />
          <div className="movie-title">
            <h3 className="title">
              {movie.name}
            </h3>
          </div>
          <div className="btn">
            <Button variant="contained" fullWidth color='primary' size="large" className="button">
              Buy ticket
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieCard;
