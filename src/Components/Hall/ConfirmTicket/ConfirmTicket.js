import React, { Component } from 'react';
import './ConfirmTicket.scss'
import TicketInfo from './TicketInfo/TicketInfo';


class ConfirmTicket extends Component {
  render() {
    return (
      <div className="confirm-container">
        <span className="confirm-title">Confirm Ticket</span>
        <div className="confirm-ticket">
          <TicketInfo number={1} />
          <TicketInfo number={4} />
          <TicketInfo number={7} />
        </div>
        <input type="submit" value="buy" className="confirm-btn" />
      </div>
    );
  }
}

export default ConfirmTicket;
