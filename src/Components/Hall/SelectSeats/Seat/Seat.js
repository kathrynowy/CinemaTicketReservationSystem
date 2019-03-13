import React, { Component } from 'react';


class Seat extends Component {
  handleSelect = () => {
    const { row, seat, cost, cinemaId, movieId, hallId } = this.props;
      const ticket = { id: `${row}.${seat}`, cinemaId, movieId, hallId, row, seat, cost }
      const isForbid = this.props.selectedSeats.find(seat => seat.id == ticket.id);
    if ((this.props.selectedSeats.length < 6) || (this.props.selectedSeats.length >= 6 && isForbid) ) 
      this.props.toggleSeat(ticket);
     
  };

  render() {
    const { seat, row, cost } = this.props;
    const isDisabled = !this.props.isBought;
    return (
      <div
        className={"row__seat" + ((this.props.isBought && " row__seat_bought") || (this.props.isSelected && " row__seat_selected") || '')}
        data-title={`${row}row ${cost}byn`}
        onClick={(isDisabled && this.handleSelect) || undefined}

        key={seat}
      >
        {seat}
      </div>
    );
  }
}

export default Seat;
