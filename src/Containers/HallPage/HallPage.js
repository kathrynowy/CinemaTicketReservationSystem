import React, { Component } from 'react';
import { connect } from 'react-redux';

import Hall from '../../Components/Hall/Hall.js';
import Spinner from '../../Components/Spinner/Spinner';
import { getBoughtTicketsAsync } from "../../actions/tickets";
import {
  toggleSeat,
  getSeatsAsync,
  clearSelectedSeats,
  getSelectedSeats,
  addSelectedSeat
} from "../../actions/seats";
import { checkAuth } from '../../actions/users';
import { addBoughtTicket } from '../../actions/tickets';
import { showSpinner, hideSpinner } from '../../actions/spinner';
import { getMovieAsync } from '../../actions/movies';
import { getCinemaAsync } from '../../actions/cinemas';
import { getHallAsync } from '../../actions/halls';
import { showSnackbar } from '../../actions/snackbar';
import { sendToggledSeatToServer } from '../../socket';

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
    this.props.clearSeats();

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
  getHallAsync(id) {
    return dispatch(getHallAsync(id));
  },
  showSnackbar(message) {
    dispatch(showSnackbar(message));
  },
  getMovieAsync(id) {
    return dispatch(getMovieAsync(id));
  },
  getCinemaAsync(id) {
    return dispatch(getCinemaAsync(id));
  },
  onToggleSeat(ticket) {
    dispatch(toggleSeat(ticket));
  },
  checkAuth() {
    return dispatch(checkAuth());
  },
  getSeatsAsync(hallId) {
    return dispatch(getSeatsAsync(hallId));
  },
  getSelectedSeatsAsync(cinemaId, hallId, movieId, time) {
    return dispatch(getSelectedSeats(cinemaId, hallId, movieId, time));
  },
  getBoughtTicketsAsync() {
    return dispatch(getBoughtTicketsAsync());
  },
  clearSeats() {
    dispatch(clearSelectedSeats());
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
