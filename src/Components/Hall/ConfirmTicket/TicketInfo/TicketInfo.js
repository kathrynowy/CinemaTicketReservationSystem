import React, { Component } from 'react';
import './TicketInfo.scss'


class TicketInfo extends Component {
  render() {
    const { number, additionalServices, movieName, id, cinemaId } = this.props;
    const services = (additionalServices.filter(service => service.cinemaId == cinemaId))[0].services;
    return (
      <div className="confirm-ticket-component">
        <div className="confirm-ticket__ticket-info">
          <div className="confirm-ticket__number">
            {id+1}
          </div>
          <div className="confirm-ticket__info">
            <span>
              {movieName}
          </span>
            <span>
              {`row ${number.split('.')[0]}/seat ${number.split('.')[1]}`}
          </span>
          </div>
        </div>
        <div>
          {
            services.map(service => {
              return (
                <div className="inputGroup" key={this.props.number + service.name}>
                <input id={"option" + this.props.number + service.name } name="option1" type="checkbox" />
                <label htmlFor={"option" + this.props.number + service.name}>{service.name}</label>
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
