import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import TicketInfo from './TicketInfo/TicketInfo';
import movieData from '../../../movieData.js'
import './ConfirmTicket.scss'


class ConfirmTicket extends Component {
  state = {
    selectedServices: []
  }

  handleSelect = (seatId, serviceId, cost) => {
    const services = this.state.selectedServices;
    if (services.find(service => +service.seatId === +seatId)) {
      services.map((service) => {
        if (service.seatId === seatId) {
          if (service.service.includes(serviceId)) {
            service.service = service.service.filter(id => id !== serviceId);
            service.cost -= cost;
          } else {
            service.service.push(serviceId);
            service.cost += cost;
          }
        }
      })
    } else {
      services.push({
        seatId: seatId,
        service: [serviceId],
        cost: cost
      });
    }

    this.setState({
      selectedServices: services
    })
  }

  handleSubmit = () => {
    const confirmedTickets = this.props.selectedSeats.map((seat) => {
      const services = this.state.selectedServices.find(service => service.seatId === seat.id);
      return {
        id: seat.id,
        cinemaId: this.props.cinemaId,
        movieId: this.props.movieId,
        hallId: this.props.hallId,
        time: this.props.time,
        row: seat.row,
        seat: seat.seat,
        cost: services ? +seat.cost + services.cost : seat.cost,
        selectedServices: services ? this.state.selectedServices.find(service => service.seatId === seat.id).service : []
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
                seatId={seat.id}
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
          <input
            type="submit"
            value="confirm"
            onClick={() => {
              this.handleSubmit();
              this.props.redirectToHall(`/hall/${this.props.cinemaId}/${this.props.movieId}/${this.props.hallId}/${this.props.time}`);
            }}
            className="button button_confirm"
          />
          <Link to={{ pathname: `/hall/${this.props.cinemaId}/${this.props.movieId}/${this.props.hallId}/${this.props.time}` }}>
            <input type="button" value="back" className="button" />
          </Link>
        </div>
      </div>
    );
  }
}

export default ConfirmTicket;
