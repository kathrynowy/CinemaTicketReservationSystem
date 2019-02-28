import React, { Component } from 'react';
import SelectSeats from './SelectSeats/SelectSeats.js'
import SeatsInfo from './SeatsInfo/SeatsInfo.js'
import './Hall.scss'

class Hall extends Component {
  state = {
    seat: '',
    row: '',
    cost: ''
  }
  selectTicket = (row, seat, cost) => {
    this.setState({
      row: row,
      seat: seat,
      cost: cost
    })
  }

  render() {
    return (
      <div className="hall-container">
        <div className="hall">
          <div className="hall__screen"></div>
          <SelectSeats selectTicket={this.selectTicket} />{/* seatsmap */}
          <div className="hall-legend">
            <div className="hall-legend__seat-type_free"><div className="hall-legend__icon_free"></div> <span className="hall-legend__text_free">free</span> </div>
            <div className="hall-legend__seat-type_selected"><div className="hall-legend__icon_selected"></div> <span className="hall-legend__text_selected">selected</span></div>
            <div className="hall-legend__seat-type_bought"><div className="hall-legend__icon_bought"></div> <span className="hall-legend__text_bought">bought</span> </div>
          </div>
        </div>
        <div className="seats-information">
          <SeatsInfo seat={this.state.seat} cost={this.state.cost} />
        </div>
      </div>
    );
  }
}

export default Hall;