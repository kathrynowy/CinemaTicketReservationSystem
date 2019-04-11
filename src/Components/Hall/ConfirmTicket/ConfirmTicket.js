import React, { Component } from 'react';

import TicketInfo from './TicketInfo/TicketInfo';
import './ConfirmTicket.scss';


class ConfirmTicket extends Component {
  state = {
    selectedServices: []
  }

  handleSelect = (seatId, serviceId, cost) => {
    const services = this.state.selectedServices;
    const service = services.find(service => +service.seatId === +seatId);
    if (service) {
      if (service.service.includes(serviceId)) {
        service.service = service.service.filter(id => id !== serviceId);
        service.cost -= +cost;
      } else {
        service.service.push(serviceId);
        service.cost += +cost;
      }
    } else {
      services.push({
        seatId: seatId,
        service: [serviceId],
        cost: +cost
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
        cinemaId: this.props.cinemaId,
        movieId: this.props.movieId,
        hallId: this.props.hallId,
        time: this.props.time,
        row: seat.row,
        seat: seat.seat,
        userId: seat.userId,
        cost: services ? +seat.cost + services.cost : seat.cost,
        selectedServices: services ? services.service : []
      }
    });

    this.props.buyTickets(confirmedTickets);
  }

  render() {
    const { additionalServices, selectedSeats } = this.props;
    const url = `/hall/${this.props.cinemaId}/${this.props.movieId}/${this.props.hallId}/${this.props.time}`;
    return (
      <div className="confirm-container">
        <span className="confirm-title">Confirm Ticket</span>
        <div className="confirm-ticket"> {
          selectedSeats.map((seat, index) => {
            const movie = this.props.movies.find(movie => movie.id === seat.movieId);
            return (
              this.props.additionalServices.length && movie && <TicketInfo
                key={seat.row + "" + seat.seat + index}
                row={seat.row}
                seat={seat.seat}
                cost={seat.cost}
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
              this.props.redirectToHall(url);
            }}
            className="button button_confirm"
          />
          <button
            className="button"
            onClick={() => {
              this.props.redirectToHall(url)
            }}
          >
            back
          </button>
        </div>
      </div>
    );
  }
}

export default ConfirmTicket;
