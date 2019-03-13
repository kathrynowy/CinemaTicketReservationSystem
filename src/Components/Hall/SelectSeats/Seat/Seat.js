import React, { Component } from 'react';


class Seat extends Component {
  handleSelect = () => {
    const { row, seat, cost, cinemaId, movieId, hallId } = this.props;
    const ticket = { id: `${row}.${seat}`, cinemaId, movieId, hallId, row, seat, cost }
    this.props.selectTicket(ticket);
  };

  render() {
    const { seat, row, cost } = this.props;
    const isDisabled = !this.props.isBought;
    return (
      <div
        className={"row__seat" + ((this.props.isBought && " row__seat_bought") || (this.props.isSelected && " row__seat_selected") || '')}
        data-title={`${row}ряд ${cost}руб`}
        onClick={isDisabled && this.handleSelect}

        key={seat}
      >
        {seat}
      </div>
    );
  }
}

export default Seat;
