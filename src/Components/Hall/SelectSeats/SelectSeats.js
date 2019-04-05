import React, { Component } from 'react';

import Seat from './Seat/Seat.js'
import './SelectSeats.scss';


class SelectSeats extends Component {
  handleCompare = (array, id) => array.find(element => {
    return element.row + "." + element.seat === id
  });

  handleIsSelected = (boughtTickets, cinemaId, hallId, movieId, time, id) => {
    return boughtTickets.find(ticket => {
      return (
        ticket.cinemaId === cinemaId &&
        ticket.hallId === hallId &&
        ticket.movieId === movieId &&
        ticket.time === +time &&
        ticket.row + "." + ticket.seat === id
      )
    })
  }

  handleDrawSeats = (boughtSeats, amount, row, cost, cinemaId, movieId, hallId, time) => {
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
          hallId={hallId}
          isBought={this.handleIsSelected(boughtSeats, cinemaId, hallId, movieId, time, (row + "." + i))}
          isSelected={this.handleCompare(this.props.selectedSeats, (row + "." + i))}
          toggleSeat={this.props.toggleSeat}
        />
      )
    }
    return seats;
  };

  render() {
    const { cinemaId, movieId, hallId, boughtSeats, time } = this.props;
    const seats = this.props.seats || [];
    return (
      seats.map((seats) => {
        return (
          <div className="row" key={seats.row}>
            <div className="row__number">{seats.row}</div>
            <div className={seats.row + ' row__seats-container'}>
              {this.handleDrawSeats(boughtSeats, seats.amountOfSeats, seats.row, seats.cost, cinemaId, movieId, hallId, time)}
            </div>
            <div className="row__number"></div>
          </div>
        );
      })
    );
  }
}

export default SelectSeats;
