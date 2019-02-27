import React, { Component } from 'react';
import SeatsData from './SeatsData.js'
import './SelectSeats.scss';


class SelectSeats extends Component {
  state = {
    isSelected: false,
  };

  handleSelect = () => {
    this.setState({
      isSelected: true,
    });
  }

  handleDrawSeats = (amount, row, cost) => {
    let seats = [];
    for (let i = 0; i < amount; i++) {
      seats.push(<div className={"row__seat"} data-title={`${row}ряд ${cost}руб`} color={this.state.isSelected && 'blue'} onClick={this.handleSelect} key={i + 1}>{i + 1}</div >)
    }
    return seats;
  };

  render() {
    const seats = SeatsData;
    console.log(seats);

    return (
      seats.map((seat) => {
        const count = seat.amountOfSeats;
        return (
          <div className="row">
            <div className="row__number">{seat.row}</div>
            <div className={seat.row + ' row__seats-container'}>{this.handleDrawSeats(count, seat.row, seat.cost)} </div>
            <div className="row__number">{seat.row}</div>
          </div>
        );
      })
    );
  }
}

export default SelectSeats;