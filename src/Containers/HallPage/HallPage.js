import React, { Component } from 'react';
import PrimarySearchAppBar from '../../Components/PrimarySearchAppBar/PrimarySearchAppBar.js'
import Hall from '../../Components/Hall/Hall.js'
import store from '../../index.js'
import { selectTicket } from "../../actions/index.js";
import { SELECT_TICKET } from '../../constans/actionTypes.js'


import { connect } from 'react-redux';

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

