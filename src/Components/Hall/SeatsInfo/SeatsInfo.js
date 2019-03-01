import React, { Component } from 'react';
import './SeatsInfo.scss'


class SeatsInfo extends Component {
  render() {
    const selectedSeats = this.props.selectedSeats;
    return (
      <div className="seats-info">
        <div className="seats-info__choosed-tickets-list"> {
          selectedSeats.map((seat) =>
            <div key={seat} className="seats-info__choosed-ticket">Ряд {seat.split('.')[0]}, Место {seat.split('.')[1]}</div>
          )
        }
        </div>
        <div className="seats-info__include">Включить в билет: </div>
        <button className="seats-info__btn">Buy ticket</button>
      </div>
    );
  }
}

export default SeatsInfo;
