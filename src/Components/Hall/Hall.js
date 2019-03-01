import React, { Component } from 'react';
import SelectSeats from './SelectSeats/SelectSeats.js'
import SeatsInfo from './SeatsInfo/SeatsInfo.js'
import './Hall.scss'

class Hall extends Component {
  state = {
    seat: '',
    row: '',
    selectedSeats: ["1.1", "2.2"]
  }
  selectTicket = (row, seat) => {
    const newSeats = this.state.selectedSeats.includes(`${row}.${seat}`)
      ? this.state.selectedSeats.filter(seatNumber => seatNumber !== `${row}.${seat}`)
      : [...this.state.selectedSeats, `${row}.${seat}`]

    this.setState({
      row: row,
      seat: seat,
      selectedSeats: newSeats
    })
  }


  render() {
    return (
      <div className="hall-container">
        <div className="hall">
          <div className="hall__screen"></div>
          <SelectSeats selectTicket={this.selectTicket} selectedSeats={this.state.selectedSeats} />{/* seatsmap */}
          <div className="hall-legend">
            <div className="hall-legend__seat-type_free"><div className="hall-legend__icon_free"></div> <span className="hall-legend__text_free">free</span> </div>
            <div className="hall-legend__seat-type_selected"><div className="hall-legend__icon_selected"></div> <span className="hall-legend__text_selected">selected</span></div>
            <div className="hall-legend__seat-type_bought"><div className="hall-legend__icon_bought"></div> <span className="hall-legend__text_bought">bought</span> </div>
          </div>
        </div>
        <div className="seats-information">
          <SeatsInfo selectedSeats={this.state.selectedSeats} row={this.state.row} />
        </div>
      </div>
    );
  }
}

export default Hall;