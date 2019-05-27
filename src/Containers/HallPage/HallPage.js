import React, { Component } from 'react';
import { connect } from 'react-redux';

import Hall from '../../Components/Hall/Hall.js';
import Spinner from '../../Components/Spinner/Spinner';
import { checkAuth } from '../../actions/users';
import { addBoughtTicket } from '../../sagas/tickets';
import { showSpinner, hideSpinner } from '../../sagas/spinner';
import { showSnackbar } from '../../sagas/snackbar';
import { sendToggledSeatToServer } from '../../socket';
import { addSelectedSeat } from '../../sagas/seats';

import {
  GET_SEATS,
  GET_SELECTED_SEATS,
  TOGGLE_SEAT,
  GET_MOVIE,
  GET_CINEMA,
  GET_HALL,
  GET_BOUGHT_TICKETS,
  CLEAR_SELECTED_LIST,
  CHECK_AUTH
} from '../../constans/actionTypes';

const MAX_AMOUNT_OF_SEATS = 6;
const TIMER_FOR_BOOKING = 900000;

let timer = '';

class HallPage extends Component {
  state = {
    timer: ''
  }

  onToggleSeat = (seat) => {
    if (!timer) {
      timer = setTimeout(() => this.props.history.push('/'), TIMER_FOR_BOOKING);
    }

    const isSelected = this.props.selectedSeats.find(selectedSeat => selectedSeat.row === seat.row && selectedSeat.seat === seat.seat);

    this.props.selectedSeats.length < MAX_AMOUNT_OF_SEATS || isSelected
      ? sendToggledSeatToServer(seat, this.props.currentUser.id)
      : this.props.showSnackbar('You cannot choose more than 6 seats at the same time');
  }

  clearInterval = () => {
    clearInterval(timer);
  }

  async componentDidMount() {
    this.props.showSpinner();
    const { cinemaId, hallId, movieId, time } = this.props.match.params;
    await this.props.getSeatsAsync(hallId);
    this.props.checkAuth();
    await this.props.getSelectedSeatsAsync(cinemaId, hallId, movieId, time);
    await this.props.getBoughtTicketsAsync();
    await this.props.getMovieAsync(movieId);
    await this.props.getCinemaAsync(cinemaId);
    await this.props.getHallAsync(hallId);
    await this.props.clearSeats();

    for (let i = 0; i < this.props.bookingSeats.length; i++) {
      if (this.props.bookingSeats[i].userId === this.props.currentUser.id) {
        this.props.addSelectedSeat(this.props.bookingSeats[i]);
      }
      else {
        this.props.addBoughtTicket(this.props.bookingSeats[i]);
      }
    }
    this.props.hideSpinner();
  }

  render() {
    return (
      this.props.isLoading
        ? <Spinner />
        : <Hall
          time={this.props.match.params.time}
          selectedSeats={this.props.selectedSeats}
          bookingSeats={this.props.bookingSeats}
          boughtSeats={this.props.boughtSeats}
          onToggleSeat={this.onToggleSeat}
          seats={this.props.seats}
          clearInterval={this.clearInterval}
          movie={this.props.movie}
          cinema={this.props.cinema}
          hall={this.props.hall}
        />
    )
  }
}

const mapStateToProps = store => ({
  selectedSeats: store.seats.selectedSeats,
  boughtSeats: store.ticketsList.boughtTickets,
  seats: store.seats.allSeats,
  bookingSeats: store.seats.bookingSeats,
  currentUser: store.users.currentUser,
  isLoading: store.spinner.isLoading,
  movie: store.movies.movie,
  cinema: store.cinemas.cinema,
  hall: store.halls.hall
});

const mapDispatchToProps = dispatch => ({
  getHallAsync(hallId) {
    return dispatch({ type: GET_HALL, hallId });
  },
  getMovieAsync(movieId) {
    return dispatch({ type: GET_MOVIE, movieId });
  },
  showSnackbar(message) {
    dispatch(showSnackbar(message));
  },
  getCinemaAsync(cinemaId) {
    return dispatch({ type: GET_CINEMA, cinemaId });
  },
  onToggleSeat(seat) {
    return dispatch({ type: TOGGLE_SEAT, seat });
  },
  checkAuth() {
    return dispatch({ type: CHECK_AUTH });
  },
  getSeatsAsync(hallId) {
    return dispatch({ type: GET_SEATS, hallId });
  },
  getSelectedSeatsAsync(cinemaId, hallId, movieId, time) {
    return dispatch({ type: GET_SELECTED_SEATS, cinemaId, hallId, movieId, time });
  },
  getBoughtTicketsAsync() {
    return dispatch({ type: GET_BOUGHT_TICKETS });
  },
  clearSeats() {
    return dispatch({ type: CLEAR_SELECTED_LIST });
  },
  addSelectedSeat(seat) {
    dispatch(addSelectedSeat(seat));
  },
  addBoughtTicket(ticket) {
    dispatch(addBoughtTicket(ticket));
  },
  showSpinner() {
    dispatch(showSpinner());
  },
  hideSpinner() {
    dispatch(hideSpinner());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(HallPage);
