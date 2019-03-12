import React, { Component } from 'react';

import './TicketInfo.scss'


class TicketInfo extends Component {
  render() {
    const { row, seat, additionalServices, movieName, ticketId, cinemaId } = this.props;
    const services = (additionalServices.filter(service => service.cinemaId == cinemaId))[0].services;
    return (
      <div className="confirm-ticket-component">
        <div className="confirm-ticket__ticket-info">
          <div className="confirm-ticket__number">
            {ticketId}
          </div>
          <div className="confirm-ticket__info">
            <span>
              {movieName}
            </span>
            <span>
              {`row ${row}/seat ${seat}`}
            </span>
          </div>
        </div>
        <div>
          {
            services.map((service, index) => {
              return (
                <div className="input-group" key={row + seat + service.name}>
                  <input
                    className="input-group__service"
                    id={"option" + row + seat + service.name}
                    name="option1"
                    type="checkbox"
                  />
                  <label className="input-group__name" htmlFor={"option" + row + seat + service.name}>{service.name}</label>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default TicketInfo;
