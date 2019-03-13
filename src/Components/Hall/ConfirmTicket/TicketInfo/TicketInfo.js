import React, { Component } from 'react';

import './TicketInfo.scss'


class TicketInfo extends Component {
  constructor(props) {
    super(props);
    const services = (props.additionalServices.filter(service => service.cinemaId == props.cinemaId))[0].services;
    this.state = {
      form: services.map((service, index) => {
        return ({
          id: index,
          value: false,
          name: service.name,
          cost: service.cost
        });
      })
    }
  }

  handleSelect = (ticketId, serviceName, cost, index) => {
    const newForm = this.state.form;
    newForm[index].value = !newForm[index].value;
    this.setState({
      form: this.state.form
    })
    this.props.handleSelect(ticketId, index, cost);
  }

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
                    checked={this.state.form[index].value}
                    onChange={() => {
                      return this.handleSelect(ticketId - 1, service.name, service.cost, index);
                    }}
                  />
                  <label className="input-group__name" htmlFor={"option" + row + seat + service.name}>
                    {service.name}
                  </label>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default TicketInfo;
