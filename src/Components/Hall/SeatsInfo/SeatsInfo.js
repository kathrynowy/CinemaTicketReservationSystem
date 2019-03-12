import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './SeatsInfo.scss'


class SeatsInfo extends Component {
  render() {
    const isDisabled = !this.props.selectedSeats.length;
    const newCost = this.props.selectedSeats.reduce((cost, seat) => {
      return cost + +seat.cost;
    }, 0)
    const selectedSeats = this.props.selectedSeats;
    return (
      <div className="seats-info">
        <div className="seats-info__choosed-tickets-list">
          <span className="seats-info__choosed-tickets-title">Choosed seats: </span>
          {
            selectedSeats.map((seat) =>
              <div key={seat.id} className="seats-info__choosed-ticket">row {seat.row}/seat {seat.seat}</div>
            )
          }
        </div>
        <div className="seats-info__include">Cost: {(newCost || ' ')}byn </div>
        <Link to="/confirm-ticket"><input type="button" className="seats-info__btn" disabled={isDisabled} value="buy" /></Link>
      </div>
    );
  }
}

export default SeatsInfo;
