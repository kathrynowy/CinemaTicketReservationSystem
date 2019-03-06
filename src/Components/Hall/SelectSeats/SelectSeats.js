import React, { Component } from 'react';
import SeatsData from '../../../SeatsData.js'
import './SelectSeats.scss';
import Seat from './Seat/Seat.js'



class SelectSeats extends Component {
  handleDrawSeats = (amount, row, cost) => {
    let seats = [];
    for (let i = 0; i < amount; i++) {
      seats.push(
        <Seat seat={i + 1} row={row} cost={cost} key={i + 1}
          isSelected={
            this.props.selectedSeats.find((seat) => seat === `${row}.${i + 1}.${cost}`)
          }
          selectTicket={this.props.selectTicket}
          selectedSeats={this.props.selectedSeats} />)
    }
    return seats;
  };

  render() {
    const { idCinema, idMovie, idHall, time } = this.props;
    const seats = SeatsData.filter((hall) => idCinema == hall.idCinema && idHall == hall.idHall);
    return (
      seats.map((seat) => {
        return (
          seat.hall.map((seats) => {
            return (
              <div className="row" key={seats.row}>
                <div className="row__number">{seats.row}</div>
                <div className={seats.row + ' row__seats-container'}>{this.handleDrawSeats(seats.amountOfSeats, seats.row, seats.cost)} </div>
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