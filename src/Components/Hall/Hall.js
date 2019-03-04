import React, { Component } from 'react';
import SelectSeats from './SelectSeats/SelectSeats.js'
import SeatsInfo from './SeatsInfo/SeatsInfo.js'
import SeatsData from './SelectSeats/SeatsData';
import './Hall.scss'

class Hall extends Component {
  state = {
    seat: '',
    row: '',
    cost: '',
    selectedSeats: ["1.1.8", "2.2.12"]
  }
  selectTicket = (row, seat, cost) => {
    const newSeats = this.state.selectedSeats.includes(`${row}.${seat}.${cost}`)
      ? this.state.selectedSeats.filter(seatNumber => seatNumber !== `${row}.${seat}.${cost}`)
      : [...this.state.selectedSeats, `${row}.${seat}.${cost}`]

    this.setState({
      row: row,
      seat: seat,
      cost: cost,
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
          <SeatsInfo selectedSeats={this.state.selectedSeats} SeatsData={SeatsData} />
        </div>
      </div>
    );
  }
}

export default Hall;