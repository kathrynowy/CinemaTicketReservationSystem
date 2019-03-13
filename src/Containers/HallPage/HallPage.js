import React, { Component } from 'react';
import { connect } from 'react-redux';

import { selectTicket } from "../../actions/index.js";
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
        onSelectTicket={this.props.onSelectTicket}
      />
    )
  }
}

const mapStateToProps = store => ({
  selectedSeats: store.selectTicket.selectedSeats
})

const mapDispatchToProps = dispatch => ({
  onSelectTicket(ticket) {
    dispatch(selectTicket(ticket));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(HallPage);
