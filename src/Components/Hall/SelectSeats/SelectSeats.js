import React, { Component } from 'react';
import SeatsData from '../../../SeatsData.js'
import './SelectSeats.scss';
import Seat from './Seat/Seat.js'



class SelectSeats extends Component {
  handleDrawSeats = (amount, row, cost, cinemaId, movieId, hallId) => {
    let seats = [];
    for (let i = 0; i < amount; i++) {
      seats.push(
        <Seat 
          seat={i + 1} 
          row={row} 
          cost={cost} 
          key={i + 1} 
          cinemaId={cinemaId} 
          movieId={movieId} 
          hallId={hallId} 
          isSelected={
            this.props.selectedSeats.find((seat) => seat.id === `${row}.${i + 1}.${cost}`)
          }
          selectTicket={this.props.selectTicket}
          selectedSeats={this.props.selectedSeats} 
        />
      )
    }
    return seats;
  };

  render() {
    const { cinemaId, movieId, hallId, time } = this.props;
    const seats = SeatsData.filter((hall) => cinemaId == hall.cinemaId && hallId == hall.hallId);
    return (
      seats.map((seat) => {
        return (
          seat.hall.map((seats) => {
            return (
              <div className="row" key={seats.row}>
                <div className="row__number">{seats.row}</div>
                <div className={seats.row + ' row__seats-container'}>{this.handleDrawSeats(seats.amountOfSeats, seats.row, seats.cost, cinemaId, movieId, hallId)} </div>
                <div className="row__number">{seats.row}</div>
              </div>
            );
          })

        );
      })
    );
  }
}

export default SelectSeats;