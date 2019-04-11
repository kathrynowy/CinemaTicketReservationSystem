import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './SeatsInfo.scss'


class SeatsInfo extends Component {
  render() {
    const { cinemaId, movieId, hallId, time } = this.props;
    const isDisabled = !this.props.selectedSeats.length;
    const newCost = this.props.selectedSeats.reduce((cost, seat) => {
      return cost + +seat.cost;
    }, 0)
    const selectedSeats = this.props.selectedSeats;
    return (
      <div className="chosen-seats-info">
        <div className="chosen-seats-info__tickets-list">
          <span className="chosen-seats-info__tickets-title">Chosen seats: </span>
          {
            selectedSeats.map((seat) =>
              <div key={seat.id} className="chosen-seats-info__ticket">
                row {seat.row}/seat {seat.seat}
              </div>
            )
          }
        </div>
        <div className="chosen-seats-info__include">Cost: {(newCost || ' ')}byn </div>
        <Link to={{ pathname: `/confirm-ticket/${cinemaId}/${movieId}/${hallId}/${time}` }} onClick={this.props.clearInterval()}>
          <button className="chosen-seats-info__btn" disabled={isDisabled}>Buy</button>
        </Link>
      </div>
    );
  }
}

export default SeatsInfo;
