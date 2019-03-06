import React, { Component } from 'react';
import PrimarySearchAppBar from '../../Components/PrimarySearchAppBar/PrimarySearchAppBar.js'
import Hall from '../../Components/Hall/Hall.js'
import store from '../../index.js'
import { selectTicket } from "../../actions/index.js";

import { connect } from 'react-redux';

class HallPage extends Component {
  render() {
    return (
      <Hall
        idCinema={this.props.match.params.idCinema}
        idMovie={this.props.match.params.idMovie}
        idHall={this.props.match.params.idHall}
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

const mapDispatchToProps = {
  onSelectTicket: selectTicket
}


export default connect(mapStateToProps, mapDispatchToProps)(HallPage);

