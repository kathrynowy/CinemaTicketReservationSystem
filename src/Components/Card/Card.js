import React, { Component } from 'react';
import { Card, CardActionArea, CardActions, CardMedia, Typography } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import './card.scss';


class MovieCard extends Component {
  render() {
    const { movie } = this.props;
    return (

      <div className="container">
        <div className="card">
          <img
            className="media"
            src={movie.img}
            title="Contemplative Reptile"
          />
          <div className="movie-title">
            <h3 className="title">
              {movie.name}
            </h3>
          </div>
          <div className="btn">
            <Button variant="contained" size="large" className="button">
              Buy ticket
         </Button>
          </div>
        </div>
      </div>
    );
  }
}



export default MovieCard;