import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import TicketInfo from './TicketInfo/TicketInfo';
import movieData from '../../../movieData.js'
import './ConfirmTicket.scss'


class ConfirmTicket extends Component {
  state = {
    choosedServices: [
      {
        ticketId: 0,
        service: [0,2]
      }
    ]
  }
  handleSelect = (ticketId, serviceId) => {
    const services = this.state.choosedServices;

    if (services.length === 0) {
      services.push({
        ticketId: ticketId,
        service: [serviceId]
      });

      this.setState({
        choosedServices: services
      })
    }

    services.map((service) => {
      if (service.ticketId === ticketId) {
        service.service.includes(serviceId) 
          ? service.service = service.service.filter(id => id !== serviceId)
          : service.service.push(serviceId)
      } 
    }) 
    this.setState({
      choosedServices: services
    })
  }


  render() {
    const { additionalServices, selectedSeats } = this.props;
    return (
      <div className="confirm-container">
        <span className="confirm-title">Confirm Ticket</span>
        <div className="confirm-ticket"> {
          selectedSeats.map((seat, index) => {
            const movie = movieData.find(movie => movie.id == seat.movieId);
            return (
              <TicketInfo
                key={seat.id}
                row={seat.row}
                seat={seat.seat}
                ticketId={index + 1}
                selectedSeats={selectedSeats}
                cinemaId={seat.cinemaId}
                additionalServices={additionalServices}
                movieName={movie.name}
                handleSelect={this.handleSelect}
              />
            );
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
