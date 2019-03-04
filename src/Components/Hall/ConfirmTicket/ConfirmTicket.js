import React, { Component } from 'react';
import './ConfirmTicket.scss'
import TicketInfo from './TicketInfo/TicketInfo';
import { Link } from 'react-router-dom';


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
        <div>
          <input type="submit" value="confirm" className="confirm-btn" />
          <Link to="/hall"><input type="button" value="back" className="back-btn" /></Link>
        </div>
      </div>
    );
  }
}

export default ConfirmTicket;
