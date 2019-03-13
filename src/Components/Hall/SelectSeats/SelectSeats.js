import React, { Component } from 'react';

import Seat from './Seat/Seat.js'
import './SelectSeats.scss';



class SelectSeats extends Component {
  handleDrawSeats = (boughtSeats, amount, row, cost, cinemaId, movieId, hallId) => {
    let seats = [];
    for (let i = 1; i <= amount; i++) {
      seats.push(
        <Seat
          seat={i}
          row={row}
          cost={cost}
          key={i}
          cinemaId={cinemaId}
          movieId={movieId}
          boughtSeats={boughtSeats}
          hallId={hallId}

          isBought={
            boughtSeats.find(seat => {
              return (seat.row === row && seat.seat === i)
            })
          }
          isSelected={
            this.props.selectedSeats.find(seat => {
              return seat.id === (row + "." + i)
            })
          }

          toggleSeat={this.props.toggleSeat}
          selectedSeats={this.props.selectedSeats}
        />
      )
    }
    return seats;
  };

  render() {
    const { cinemaId, movieId, hallId, boughtSeats } = this.props;
    const seats = this.props.seats.filter((hall) => cinemaId == hall.cinemaId && hallId == hall.hallId);
    return (
      seats.map((seat) => {
        return (
          seat.hall.map((seats) => {
            return (
              <div className="row" key={seats.row}>
                <div className="row__number">{seats.row}</div>
                <div className={seats.row + ' row__seats-container'}>
                  {this.handleDrawSeats(boughtSeats, seats.amountOfSeats, seats.row, seats.cost, cinemaId, movieId, hallId)}
                </div>
                <div className="row__number"></div>
              </div>
            );
          })
        );
      })
    );
  }
}

export default SelectSeats;
