import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getAdditionalServicesAsync } from '../../actions/index.js'
import additionalServices from '../../additionalServices.js'
import ConfirmTicket from '../../Components/Hall/ConfirmTicket/ConfirmTicket.js';
import { buyTickets, clearSelectedSeats } from '../../actions/index.js';


class ConfirmTicketsPage extends Component {
  componentDidMount() {
    this.props.getAdditionalServicesAsync(additionalServices);
  }

  render() {
    return (
      this.props.additionalServices.length !== 0 && <ConfirmTicket
        additionalServices={this.props.additionalServices}
        selectedSeats={this.props.selectedSeats}
        buyTickets={this.props.onBuyTickets}
        cinemaId={this.props.match.params.cinemaId}
        movieId={this.props.match.params.movieId}
        hallId={this.props.match.params.hallId}
        time={this.props.match.params.time}
        history={this.props.history}
      />
    );
  }
}

const mapStateToProps = store => ({
  selectedSeats: store.seats.selectedSeats,
  additionalServices: store.additionalServices.additionalServices
})

const mapDispatchToProps = dispatch => ({
  getAdditionalServicesAsync(additionalServices) {
    dispatch(getAdditionalServicesAsync(additionalServices));
  },
  onBuyTickets(tickets) {
    dispatch(buyTickets(tickets));
    dispatch(clearSelectedSeats())
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmTicketsPage);
