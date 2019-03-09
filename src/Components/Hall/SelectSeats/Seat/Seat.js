import React, { Component } from 'react';


class Seat extends Component {

  handleSelect = () => {
    const {row, seat, cost, cinemaId, movieId, hallId} = this.props;
    const ticket = {
      id: `${row}.${seat}.${cost}`,
      cinemaId: cinemaId,
      movieId: movieId,
      hallId: hallId
    }
    this.props.selectTicket(ticket);
  };

  render() {
    const { seat, row, cost } = this.props;
    return (
      <div className={"row__seat" + ((this.props.isSelected && " row__seat_selected") || '')} data-title={`${row}ряд ${cost}руб`} onClick={this.handleSelect} key={seat}>{seat}</div >
    );
  }
}

export default Seat;
