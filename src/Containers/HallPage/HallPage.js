import React, { Component } from 'react';
import { connect } from 'react-redux';

import { toggleSeat, getSeatsAsync, getBoughtTicketsAsync } from "../../actions/index.js";
import Hall from '../../Components/Hall/Hall.js'


class HallPage extends Component {
  onToggleSeat = (ticket) => {
    const isSelected = this.props.selectedSeats.find(seat => seat.id === ticket.id);
    if (this.props.selectedSeats.length < 6 || isSelected) {
      this.props.onToggleSeat(ticket);
    }
  }

  componentWillUpdate() {
    this.props.getBoughtTicketsAsync();
  }

  componentDidMount() {
    this.props.getSeatsAsync();
    this.props.getBoughtTicketsAsync()
  }

  render() {
    return (
      <Hall
        cinemaId={this.props.match.params.cinemaId}
        movieId={this.props.match.params.movieId}
        hallId={this.props.match.params.hallId}
        time={this.props.match.params.time}
        selectedSeats={this.props.selectedSeats}
        boughtSeats={this.props.boughtSeats}
        onToggleSeat={this.onToggleSeat}
        seats={this.props.seats}
      />
    )
  }
}

const mapStateToProps = store => ({
  selectedSeats: store.seats.selectedSeats,
  boughtSeats: store.ticketsList.boughtTickets,
  seats: store.seats.seats
});

const mapDispatchToProps = dispatch => ({
  onToggleSeat(ticket) {
    dispatch(toggleSeat(ticket));
  },
  getSeatsAsync() {
    dispatch(getSeatsAsync());
  },
  getBoughtTicketsAsync() {
    dispatch(getBoughtTicketsAsync());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(HallPage);
