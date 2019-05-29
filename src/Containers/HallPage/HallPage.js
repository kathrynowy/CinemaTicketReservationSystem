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
    timer: '',
    isBookingSeatsTransformed: false
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

  componentDidMount() {
    const { cinemaId, hallId, movieId, time } = this.props.match.params;
    this.props.showSpinner();
    this.props.getSeatsAsync(hallId);
    this.props.checkAuth();
    this.props.getSelectedSeatsAsync(cinemaId, hallId, movieId, time);
    this.props.getBoughtTicketsAsync();
    this.props.getMovieAsync(movieId);
    this.props.getCinemaAsync(cinemaId);
    this.props.getHallAsync(hallId);
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.bookingSeats.length && !this.state.isBookingSeatsTransformed && nextProps.currentUser.id) {
      for (let i = 0; i < nextProps.bookingSeats.length; i++) {
        if (nextProps.bookingSeats[i].userId === nextProps.currentUser.id) {
          nextProps.addSelectedSeat(nextProps.bookingSeats[i]);
        }
        else {
          nextProps.addBoughtTicket(nextProps.bookingSeats[i]);
        }
      }
      this.setState({ isBookingSeatsTransformed: true });
    }
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
  getHallAsync: hallId => dispatch({ type: GET_HALL, hallId }),
  getMovieAsync: movieId => dispatch({ type: GET_MOVIE, movieId }),
  showSnackbar: message => dispatch(showSnackbar(message)),
  getCinemaAsync: cinemaId => dispatch({ type: GET_CINEMA, cinemaId }),
  onToggleSeat: seat => dispatch({ type: TOGGLE_SEAT, seat }),
  addSelectedSeat: seat => dispatch(addSelectedSeat(seat)),
  addBoughtTicket: ticket => dispatch(addBoughtTicket(ticket)),
  getSeatsAsync: hallId => dispatch({ type: GET_SEATS, hallId }),
  getSelectedSeatsAsync: (cinemaId, hallId, movieId, time) => dispatch({
    type: GET_SELECTED_SEATS, cinemaId, hallId, movieId, time
  }),
  getBoughtTicketsAsync: () => dispatch({ type: GET_BOUGHT_TICKETS }),
  clearSeats: () => dispatch({ type: CLEAR_SELECTED_LIST }),
  checkAuth: () => dispatch({ type: CHECK_AUTH }),
  showSpinner: () => dispatch(showSpinner()),
  hideSpinner: () => dispatch(hideSpinner()),

});

export default connect(mapStateToProps, mapDispatchToProps)(HallPage);
