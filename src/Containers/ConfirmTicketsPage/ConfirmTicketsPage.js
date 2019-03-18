import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getAdditionalServicesAsync } from '../../actions/index.js'
import additionalServices from '../../additionalServices.js'
import ConfirmTicket from '../../Components/Hall/ConfirmTicket/ConfirmTicket.js';
import { buyTickets, clearSelectedSeats, getMoviesAsync } from '../../actions/index.js';
import movieData from '../../movieData.js';


class ConfirmTicketsPage extends Component {
  redirectToHall = (url) => {
    this.props.history.push(url);
  }

  componentDidMount() {
    this.props.getAdditionalServicesAsync(additionalServices);
    this.props.getMoviesAsync(movieData);
  }

  render() {
    return (
      this.props.additionalServices.length && this.props.movies.length && <ConfirmTicket
        additionalServices={this.props.additionalServices}
        selectedSeats={this.props.selectedSeats}
        buyTickets={this.props.onBuyTickets}
        cinemaId={this.props.match.params.cinemaId}
        movieId={this.props.match.params.movieId}
        hallId={this.props.match.params.hallId}
        time={this.props.match.params.time}
        redirectToHall={this.redirectToHall}
        movies={this.props.movies}
      />
    );
  }
}

const mapStateToProps = store => ({
  selectedSeats: store.seats.selectedSeats,
  movies: store.movies.movies,
  additionalServices: store.additionalServices.additionalServices
})

const mapDispatchToProps = dispatch => ({
  getAdditionalServicesAsync(additionalServices) {
    dispatch(getAdditionalServicesAsync(additionalServices));
  },
  onBuyTickets(tickets) {
    dispatch(buyTickets(tickets));
    dispatch(clearSelectedSeats())
  },
  getMoviesAsync(movies) {
    dispatch(getMoviesAsync(movies));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmTicketsPage);
