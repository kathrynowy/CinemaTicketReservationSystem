import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getAdditionalServicesAsync } from '../../actions/index.js'
import additionalServices from '../../additionalServices.js'
import ConfirmTicket from '../../Components/Hall/ConfirmTicket/ConfirmTicket.js';
import buyTickets from '../../reducers/boughtTickets.js';


class ConfirmTicketsPage extends Component {
  componentDidMount() {
    this.props.getAdditionalServicesAsync(additionalServices);
  }

  render() {
    return (
      this.props.additionalServices.length != 0 && <ConfirmTicket
        additionalServices={this.props.additionalServices}
        selectedSeats={this.props.selectedSeats}
        onBuyTickets={this.props.onBuyTickets}
      />
    );
  }
}

const mapStateToProps = store => ({
  selectedSeats: store.selectTicket.selectedSeats,
  additionalServices: store.additionalServices.additionalServices
})

const mapDispatchToProps = dispatch => ({
  getAdditionalServicesAsync(additionalServices) {
    dispatch(getAdditionalServicesAsync(additionalServices));
  },
  onBuyTickets(tickets) {
    dispatch(buyTickets(tickets));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmTicketsPage);
