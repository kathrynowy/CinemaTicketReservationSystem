import React, { Component } from 'react';


class Seat extends Component {
  state = {
    isSelected: false,
  };

  handleSelect = () => {
    this.setState({
      isSelected: !this.state.isSelected,
    });
  };

  render() {
    const { number, row, cost } = this.props;
    return (
      <div className={"row__seat" + ((this.state.isSelected && " row__seat_selected") || '')} data-title={`${row}ряд ${cost}руб`} onClick={this.handleSelect} key={number + 1}>{number + 1}</div >
    );
  }
}

export default Seat;
