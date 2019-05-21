import React, { Component } from 'react';


class Seat extends Component {
  handleSelect = () => {
    const { row, seat, cost, cinemaId, movieId, hallId, time } = this.props;
    const ticket = { cinemaId, movieId, hallId, row, seat, cost, time }
    this.props.toggleSeat(ticket);
  };

  render() {
    const { seat, row, cost } = this.props;
    const isDisabled = !this.props.isBought;
    return (
      <div
        className={"row__seat" + ((this.props.isBought && " row__seat_bought") || (this.props.isSelected && " row__seat_selected") || '')}
        data-title={`${row}row ${cost}$`}
        onClick={(isDisabled && this.handleSelect) || undefined}
        key={seat}
      >
        {seat}
      </div>
    );
  }
}

export default Seat;
