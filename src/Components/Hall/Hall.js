import React, { Component } from 'react';
import SelectSeats from './SelectSeats/SelectSeats.js'
import SeatsInfo from './SeatsInfo/SeatsInfo.js'
import SeatsData from '../../SeatsData.js';
import './Hall.scss'

class Hall extends Component {
  render() {
    const { cinemaId, movieId, hallId, time } = this.props;
    return (
      <div className="hall-container">
        <div className="hall">
          <div className="hall__screen"></div>
          <SelectSeats selectTicket={this.props.onSelectTicket} selectedSeats={this.props.selectedSeats} cinemaId={cinemaId} movieId={movieId} hallId={hallId} time={time} />{/* seatsmap */}
          <div className="hall-legend">
            <div className="hall-legend__seat-type hall-legend__seat-type_free"><div className="hall-legend__icon hall-legend__icon_free"></div> <span className="hall-legend__text">free</span> </div>
            <div className="hall-legend__seat-type hall-legend__seat-type_selected"><div className="hall-legend__icon hall-legend__icon_selected"></div> <span className="hall-legend__text">selected</span></div>
            <div className="hall-legend__seat-type hall-legend__seat-type_bought"><div className="hall-legend__icon hall-legend__icon_bought"></div> <span className="hall-legend__text">bought</span> </div>
          </div>
        </div>
        <div className="seats-information">
          <SeatsInfo
            selectedSeats={this.props.selectedSeats}
            SeatsData={SeatsData}
            cinemaId={cinemaId}
          />
        </div>
      </div>
    );
  }
}




export default Hall;