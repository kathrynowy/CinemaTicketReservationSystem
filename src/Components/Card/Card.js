import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardActions, CardMedia, Typography } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const styles = {
  card: {
    margin: '10px 25px',
    maxWidth: 250,
    minWidth: 250,
    display: 'inline-block',
  },
  container: {

  },
  media: {
    height: 200,
    paddingTop: '56.25%', // 16:9,
    marginTop: '30'
  },
  btn: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'stretch',
    padding: 0
  },
  button: {
    backgroundColor: "#bbdefb",
    width: '100%',
    margin: 0
  }
};



function MovieCard(props) {
  const { classes, movie } = props;
  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={require(movie.img)}
            title="Contemplative Reptile"
          />
          <CardContent> debugger;
            <Typography gutterBottom variant="h5" component="h2">
              Lizard
          </Typography>
          </CardContent>
        </CardActionArea >
        <CardActions className={classes.btn}>
          <Button variant="contained" size="large" className={classes.button}>
            Buy ticket
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

MovieCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MovieCard);