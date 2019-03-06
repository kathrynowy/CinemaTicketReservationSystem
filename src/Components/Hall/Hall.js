import React, { Component } from 'react';
import SelectSeats from './SelectSeats/SelectSeats.js'
import SeatsInfo from './SeatsInfo/SeatsInfo.js'
import SeatsData from '../../SeatsData.js';
import { selectTicket } from '../../actions/index.js'
import store from '../../index.js'
import { connect } from "react-redux";
import './Hall.scss'

class Hall extends Component {
  render() {
    const { idCinema, idMovie, idHall, time } = this.props;
    return (
      <div className="hall-container">
        <div className="hall">
          <div className="hall__screen"></div>
          <SelectSeats selectTicket={this.props.onSelectTicket} selectedSeats={this.props.selectedSeats} idCinema={idCinema} idMovie={idMovie} idHall={idHall} time={time} />{/* seatsmap */}
          <div className="hall-legend">
            <div className="hall-legend__seat-type_free"><div className="hall-legend__icon_free"></div> <span className="hall-legend__text_free">free</span> </div>
            <div className="hall-legend__seat-type_selected"><div className="hall-legend__icon_selected"></div> <span className="hall-legend__text_selected">selected</span></div>
            <div className="hall-legend__seat-type_bought"><div className="hall-legend__icon_bought"></div> <span className="hall-legend__text_bought">bought</span> </div>
          </div>
        </div>
        <div className="seats-information">
          <SeatsInfo selectedSeats={this.props.selectedSeats} SeatsData={SeatsData} />
        </div>
      </div>
    );
  }
}




export default Hall;