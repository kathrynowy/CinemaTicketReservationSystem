/* eslint-disable no-unused-expressions */
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
        service: [],
        cost: 0
      }
    ]
  }

  handleSelect = (ticketId, serviceId, cost) => {
    const services = this.state.choosedServices;
    services.find(service => +service.ticketId === +ticketId)
      ? (services.map((service) => {
        if (service.ticketId === ticketId) {
          service.service.includes(serviceId)
            ? (
              service.service = service.service.filter(id => id !== serviceId),
              service.cost -= cost
            )
            : (
              service.service.push(serviceId),
              service.cost += cost
            );
        }
      }))
      : services.push({
        ticketId: ticketId,
        service: [serviceId],
        cost: cost
      });

    this.setState({
      choosedServices: services
    })
  }

  handleSubmit = () => {
    const confirmedTickets = this.props.selectedSeats.map((seat, index) => {
      const services = this.state.choosedServices.find(service => service.ticketId === index);
      return {
        cinemaId: this.props.cinemaId,
        movieId: this.props.movieId,
        hallId: this.props.hallId,
        time: this.props.time,
        row: seat.row,
        seat: seat.seat,
        cost: services ? +seat.cost + services.cost : seat.cost,
        choosedServices: services ? this.state.choosedServices[index].service : []
      }
    });

    this.props.buyTickets(confirmedTickets);
  }

  render() {
    const { additionalServices, selectedSeats } = this.props;
    return (
      <div className="confirm-container">
        <span className="confirm-title">Confirm Ticket</span>
        <div className="confirm-ticket"> {
          selectedSeats.map((seat, index) => {
            const movie = movieData.find(movie => +movie.id === +seat.movieId);
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
          <Link to={{ pathname: `/hall/${this.props.cinemaId}/${this.props.movieId}/${this.props.hallId}/${this.props.time}` }}>
            <input type="submit" value="confirm" onClick={this.handleSubmit} className="button button_confirm" />
          </Link>
          <Link to={{ pathname: `/hall/${this.props.cinemaId}/${this.props.movieId}/${this.props.hallId}/${this.props.time}` }}>
            <input type="button" value="back" className="button" />
          </Link>
        </div>
      </div>
    );
  }
}

export default ConfirmTicket;
