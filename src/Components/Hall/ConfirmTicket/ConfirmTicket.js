import React, { Component } from 'react';
import './ConfirmTicket.scss'
import TicketInfo from './TicketInfo/TicketInfo';
import { Link } from 'react-router-dom';
import movieData from '../../../movieData.js'


class ConfirmTicket extends Component {
  render() {
    const { additionalServices, selectedSeats } = this.props;
    return (
      <div className="confirm-container">
        <span className="confirm-title">Confirm Ticket</span>
        <div className="confirm-ticket"> {
          selectedSeats.map((seat, index) => {
            const movie = movieData.find(movie => movie.id == seat.movieId);
            return <TicketInfo key={seat.id} row={seat.row} seat={seat.seat} id={index} selectedSeats={selectedSeats} cinemaId={seat.cinemaId} additionalServices={additionalServices} movieName={movie.name} />
          })
        }
        </div>
        <div>
          <input type="submit" value="confirm" className="button button_confirm" />
          <Link to="/hall"><input type="button" value="back" className="button" /></Link>
        </div>
      </div>
    );
  }
}


export default ConfirmTicket;
