import React, { Component } from 'react';
import { connect } from 'react-redux';

import { toggleSeat } from "../../actions/index.js";
import Hall from '../../Components/Hall/Hall.js'


class HallPage extends Component {
  render() {
    return (
      <Hall
        cinemaId={this.props.match.params.cinemaId}
        movieId={this.props.match.params.movieId}
        hallId={this.props.match.params.hallId}
        time={this.props.match.params.time}
        selectedSeats={this.props.selectedSeats}
        boughtSeats={this.props.boughtSeats}
        onToggleSeat={this.props.onToggleSeat}
      />
    )
  }
}

const mapStateToProps = store => ({
  selectedSeats: store.seats.selectedSeats,
  boughtSeats: store.ticketsList.boughtTickets
});

const mapDispatchToProps = dispatch => ({
  onToggleSeat(ticket) {
    dispatch(toggleSeat(ticket));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(HallPage);
