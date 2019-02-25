import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardActionArea, CardActions, CardMedia, Typography } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import './card.scss';
import { debug } from 'util';

class MovieCard extends Component {
  render() {
    const { movie } = this.props;
    return (
      <div className="container">
        <Card className="card">
          <CardActionArea>
            <CardMedia
              className="media"
              image={movie.img}
              title="Contemplative Reptile"
            />
            <CardContent className="movie-title">
              <Typography gutterBottom variant="h5" component="h2" className="title">
                {movie.name}
              </Typography>
            </CardContent>
          </CardActionArea >
          <CardActions className="btn">
            <Button variant="contained" size="large" className="button">
              Buy ticket
          </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}



export default MovieCard;