import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getBoughtTicketsAsync } from "../../actions/tickets";
import {
  toggleSeat,
  getSeatsAsync,
  clearSelectedSeats,
  getSelectedSeats,
  addSelectedSeat
} from "../../actions/seats";

import { checkAuth } from "../../actions/users"
import { addBoughtTicket } from "../../actions/tickets"
import Hall from '../../Components/Hall/Hall.js'
import Spinner from '../../Components/Spinner/Spinner';
import { showSpinner, hideSpinner } from '../../actions/spinner'

import {
  sendToggledSeatToServer
} from '../../socket';

let timer = '';
class HallPage extends Component {
  state = {
    timer: ''
  }

  onToggleSeat = (seat) => {
    if (!timer) {
      timer = setTimeout(() => this.props.history.push('/'), 900000);
    }
    const isSelected = this.props.selectedSeats.find(selectedSeat => selectedSeat.row === seat.row && selectedSeat.seat === seat.seat);
    if (this.props.selectedSeats.length < 6 || isSelected) {
      sendToggledSeatToServer(seat, this.props.currentUser.id);
    }
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
          cinemaId={this.props.match.params.cinemaId}
          movieId={this.props.match.params.movieId}
          hallId={this.props.match.params.hallId}
          time={this.props.match.params.time}
          selectedSeats={this.props.selectedSeats}
          bookingSeats={this.props.bookingSeats}
          boughtSeats={this.props.boughtSeats}
          onToggleSeat={this.onToggleSeat}
          seats={this.props.seats}
          clearInterval={this.clearInterval}
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
  isLoading: store.spinner.isLoading
});

const mapDispatchToProps = dispatch => ({
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
