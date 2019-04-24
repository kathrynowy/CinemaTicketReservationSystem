import React, { Component } from 'react';

import SelectSeats from './SelectSeats/SelectSeats.js';
import SeatsInfo from './SeatsInfo/SeatsInfo.js';
import Konva from 'konva';
import { Stage, Layer, Star, Text, Rect, Shape, Line, g } from 'react-konva';

import './Hall.scss'


class Hall extends Component {
  createSeats(seats) {
    const newseats = [];
    let rows = [];
    seats.map((seat, index) => {
      rows = [];
      [...Array(seat.amountOfSeats)].map((value, i) => {
        rows.push(
          <div>
            <Rect
              x={(i + 1) * 33} y={seat.row * 33} width={30} height={30}
              shadowBlur={10}
              fillLinearGradientStartPoint={{ x: -40, y: -40 }}
              fillLinearGradientEndPoint={{ x: 50, y: 50 }}
              fillLinearGradientColorStops={[0, 'red', 1, 'yellow']}
            />
            <Text text="Try click on rect" />
          </div>
        )
      })
      newseats.push(...rows);
      rows = [];
    })
    return newseats
  }

  render() {
    const { cinemaId, movieId, hallId, time } = this.props;
    return (
      <div className="hall-container">
        <div className="hall">
          <Stage width={200} height={200} >
            <Layer>
              <Text text="Try click on rect" fill="pink" />
              {
                this.createSeats(this.props.seats.hall || [])
                /* this.props.seats.hall.map((seat, index) => (
                  <Rect
                    x={seat.seat * 33} y={seat.row * 33} width={30} height={30}
                    shadowBlur={10}
                    fillLinearGradientStartPoint={{ x: -40, y: -40 }}
                    fillLinearGradientEndPoint={{ x: 50, y: 50 }}
                    fillLinearGradientColorStops={[0, 'red', 1, 'yellow']}
                  />
                ))
                : <Rect
                  x={33} y={33} width={30} height={30}
                  shadowBlur={10}
                  fillLinearGradientStartPoint={{ x: -40, y: -40 }}
                  fillLinearGradientEndPoint={{ x: 50, y: 50 }}
                  fillLinearGradientColorStops={[0, 'red', 1, 'yellow']}
                /> */
              }

            </Layer>
          </Stage>
          <div className="hall__screen"></div>
          <SelectSeats
            toggleSeat={this.props.onToggleSeat}
            selectedSeats={this.props.selectedSeats}
            boughtSeats={this.props.boughtSeats}
            cinemaId={cinemaId}
            movieId={movieId}
            hallId={hallId}
            time={time}
            seats={this.props.seats.hall}
          />{/* seatsmap */}
          <div className="hall-legend">
            <div className="hall-legend__seat-type hall-legend__seat-type_free">
              <div className="hall-legend__icon hall-legend__icon_free"></div>
              <span className="hall-legend__text">free</span>
            </div>
            <div className="hall-legend__seat-type hall-legend__seat-type_selected">
              <div className="hall-legend__icon hall-legend__icon_selected"></div>
              <span className="hall-legend__text">selected</span>
            </div>
            <div className="hall-legend__seat-type hall-legend__seat-type_bought">
              <div className="hall-legend__icon hall-legend__icon_bought"></div>
              <span className="hall-legend__text">bought</span>
            </div>
          </div>
        </div>
        <div className="seats-information">
          <SeatsInfo
            selectedSeats={this.props.selectedSeats}
            cinemaId={cinemaId}
            movieId={movieId}
            hallId={hallId}
            time={time}
            clearInterval={this.props.clearInterval}
          />
        </div>
      </div>
    );
  }
}

export default Hall;
