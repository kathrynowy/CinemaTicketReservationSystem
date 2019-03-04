import React, { Component } from 'react';
import './TicketInfo.scss'


class TicketInfo extends Component {
  render() {
    return (
      <div className="confirm-ticket-component">
        <div className="confirm-ticket__ticket-info">
          <div className="confirm-ticket__number">
            N1464
          </div>
          <div className="confirm-ticket__info">
            <span>
              Alita: girl
          </span>
            <span>
              row 1/seat 3
          </span>
          </div>
        </div>
        <div>
          <div class="inputGroup">
            <input id={"option" + this.props.number} name="option1" type="checkbox" />
            <label htmlFor={"option" + this.props.number}>Popcorn</label>
          </div>
          <div class="inputGroup">
            <input id={"option" + this.props.number + 1} name="option2" type="checkbox" />
            <label htmlFor={"option" + this.props.number + 1}>Coca Cola</label>
          </div>
          <div class="inputGroup">
            <input id={"option" + this.props.number + 2} name="option3" type="checkbox" />
            <label htmlFor={"option" + this.props.number + 2}>Sprite</label>
          </div>
        </div>
      </div>
    );
  }
}

export default TicketInfo;
