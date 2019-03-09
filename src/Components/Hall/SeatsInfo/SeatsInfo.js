import React, { Component } from 'react';
import './SeatsInfo.scss'
import { Link } from 'react-router-dom';


class SeatsInfo extends Component {
  render() {
    const newCost = this.props.selectedSeats.reduce((cost, seat) => {
      return cost + +seat.id.split('.')[2];
    }, 0)
    const selectedSeats = this.props.selectedSeats;
    return (
      <div className="seats-info">
        <div className="seats-info__choosed-tickets-list"> <span className="seats-info__choosed-tickets-title">Choosed seats: </span> {
          selectedSeats.map((seat) =>
            <div key={seat.id} className="seats-info__choosed-ticket">row {seat.id.split('.')[0]}/seat {seat.id.split('.')[1]}</div>
          )}
        </div>
        <div className="seats-info__include">Cost: {(newCost || ' ')}byn
        </div>
        <Link to="/confirm-ticket"><input type="button" className="seats-info__btn" value="buy" /></Link>
      </div>
    );
  }
}

export default SeatsInfo;
