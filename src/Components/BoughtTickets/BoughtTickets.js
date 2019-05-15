import React, { Component } from 'react';

import Ticket from '../Ticket/Ticket';
import './BoughtTickets.scss';

class BoughtTickets extends Component {
  render() {
    const boughtTickets = this.props.boughtTickets;
    return (
      <div className="bought-tickets"> {
        boughtTickets.map(ticket => <Ticket key={ticket.time + ticket.row + ticket.seat} ticket={ticket} />)
      }
        <button
          className="button"
          onClick={() => this.props.redirectByUrl('/')}
        >
          Back
        </button>
      </div>
    );
  }
}


export default BoughtTickets;
