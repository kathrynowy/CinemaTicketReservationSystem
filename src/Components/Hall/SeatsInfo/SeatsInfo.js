import React, { Component } from 'react';
import './SeatsInfo.scss'


class SeatsInfo extends Component {
  render() {
    return (
      <div className="seats-info">
        <div className="seats-info__choosed">Выбраны места: {this.props.seat} </div>
        <div className="seats-info__include">Включить в билет: </div>
        <div className="seats-info__cost">Стоимость: 12$ {this.props.cost}</div>
        <button className="seats-info__btn">Buy ticket</button>
      </div>
    );
  }
}

export default SeatsInfo;