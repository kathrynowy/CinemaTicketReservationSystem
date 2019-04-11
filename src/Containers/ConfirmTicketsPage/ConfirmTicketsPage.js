import React, { Component } from 'react';
import { connect } from 'react-redux';

import { checkAuth } from '../../actions/users'
import { getAdditionalServicesAsync } from '../../actions/additionalServices'
import ConfirmTicket from '../../Components/Hall/ConfirmTicket/ConfirmTicket.js';
import { getMoviesAsync } from '../../actions/movies';
import { clearSelectedSeats } from '../../actions/seats';
import { buyTicketsAsync, clearBooking } from '../../actions/tickets';
import Spinner from '../../Components/Spinner/Spinner';
import { showSpinner, hideSpinner } from '../../actions/spinner'


class ConfirmTicketsPage extends Component {
  redirectToHall = (url) => {
    this.props.history.push(url);
  }

  componentDidMount() {
    this.props.showSpinner();
    this.props.getAdditionalServicesAsync(this.props.match.params.cinemaId);
    this.props.getMoviesAsync();
    this.props.hideSpinner();
  }

  buyTickets(tickets) {
    this.props.showSpinner();
    this.props.onBuyTickets(tickets);
    this.props.clearBooking(this.props.currentUser.id);
    this.props.hideSpinner();
  }

  render() {
    return (
      this.props.show
        ? <Spinner />
        : <ConfirmTicket
          additionalServices={this.props.additionalServices}
          selectedSeats={this.props.selectedSeats}
          buyTickets={(tickets) => this.buyTickets(tickets)}
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
  additionalServices: store.additionalServices.additionalServices,
  currentUser: store.users.currentUser,
  show: store.spinner.showSpinner
})

const mapDispatchToProps = dispatch => ({
  getAdditionalServicesAsync(id) {
    dispatch(getAdditionalServicesAsync(id));
  },
  checkAuth() {
    return dispatch(checkAuth());
  },
  clearBooking(userId) {
    dispatch(clearBooking(userId));
  },
  onBuyTickets(tickets) {
    dispatch(buyTicketsAsync(tickets));
    dispatch(clearSelectedSeats())
  },
  getMoviesAsync() {
    dispatch(getMoviesAsync());
  },
  showSpinner() {
    dispatch(showSpinner());
  },
  hideSpinner() {
    dispatch(hideSpinner());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmTicketsPage);
