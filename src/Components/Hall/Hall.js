import React, { Component } from 'react';

import SelectSeats from './SelectSeats/SelectSeats.js'
import SeatsInfo from './SeatsInfo/SeatsInfo.js'
import './Hall.scss';
import ScheduleIcon from '@material-ui/icons/Schedule';
import LocationIcon from '@material-ui/icons/LocationOn';
import EventIcon from '@material-ui/icons/Event';
import HallIcon from '@material-ui/icons/BorderAll';
import { Stage, Layer, Star, Text, Rect, Shape, Line } from 'react-konva';
import Konva from 'konva'


const OPTIONS_DATE = {
  weekday: 'short',
  day: '2-digit',
  month: 'numeric',
  year: 'numeric'
};

const OPTIONS_TIME = {
  hour: 'numeric',
  minute: 'numeric'
};

class Hall extends Component {
  /* componentDidMount() {
    this.createSeats(this.props.seats.hall || []);
  } */

  componentWillReceiveProps(nextProps) {
    if (nextProps.seats.hall && nextProps.cinema.id && nextProps.movie.id && nextProps.hall.id) {
      this.createSeats(nextProps.seats.hall, nextProps.cinema, nextProps.movie, nextProps.boughtSeats, nextProps.hall);
    }
  }

  calcWidth(hall) {
    let max = 0;
    hall
      ? hall.forEach(value => {
        if (value.amountOfSeats > max) {
          max = value.amountOfSeats;
        }
      })
      : max = 0;
    return max * 33;
  }

  calcHeight = (hall) => hall ? hall.length * 35 : 0;

  handleIsSelected = (boughtSeats, cinemaId, hallId, movieId, time, row, seat) => {
    return boughtSeats.length && boughtSeats.find(ticket => {
      return (
        ticket.cinemaId === cinemaId &&
        ticket.hallId === hallId &&
        ticket.movieId === movieId &&
        ticket.time === +time &&
        ticket.row === +row &&
        ticket.seat === +seat
      )
    })
  }

  createSeats(seats, cinema, movie, boughtSeats, hall) {
    let allSeats = [];
    let allNumbers = [];
    let rowSeats = [];
    let rowNumbers = [];
    let stage = new Konva.Stage({
      container: 'canvas',
      width: 400,
      height: 400
    })
    let seatLayer = new Konva.Layer();
    let numberLayer = new Konva.Layer();


    seats.map(seat => {
      rowSeats = [];
      rowNumbers = [];
      [...Array(seat.amountOfSeats)].map((value, i) => {
        const isBought = this.handleIsSelected(boughtSeats, cinema.id, hall.id, movie.id, this.props.time, seat.row, i + 1);
        const width = i >= 9 ? 8 : 11;
        const rect = new Konva.Rect({
          x: i * 33 + 20,
          y: (seat.row - 1) * 33,
          width: 30,
          height: 30,
          cornerRadius: 5,
          fill: isBought ? '#8f0b3eab' : '#44373b'
        });

        const number = new Konva.Text({
          x: i * 33 + width + 20,
          y: (seat.row - 1) * 33 + 10,
          width: 14,
          height: 10,
          fill: isBought ? 'white' : 'transparent',
          text: i + 1,
        })

        if (isBought) {
          console.log('row: ', seat.row, 'seat: ', i + 1, 'isBought');
        } else {
          console.log('row: ', seat.row, 'seat: ', i + 1, 'not isBought');
          rect.on('mouseover', function () {
            this.fill('#d40754');
            number.fill('white');
            seatLayer.draw();
            numberLayer.draw();
          });

          rect.on('mouseout', function () {
            this.fill('#44373b');
            number.fill('transparent');
            seatLayer.draw();
            numberLayer.draw();
          });

          rect.on('click', function () {
            alert(`seat: ${i + 1} row: ${seat.row}`)
          });

          number.on('mouseover', function () {
            rect.fill('#d40754');
            this.fill('white');
            seatLayer.draw();
            numberLayer.draw();
          });

          number.on('mouseout', function () {
            this.fill('transparent');
            rect.fill('#44373b');
            seatLayer.draw();
            numberLayer.draw();
          });
        }

        rowNumbers.push(number);
        rowSeats.push(rect);
      })

      allSeats.push(...rowSeats);
      allNumbers.push(...rowNumbers);
      rowNumbers = [];
      rowSeats = [];
    });

    if (allSeats.length && allNumbers.length) {
      seatLayer.add(...allSeats);
      numberLayer.add(...allNumbers);
      stage.add(seatLayer, numberLayer);
    }
  }

  render() {
    const { time, cinema, movie, hall } = this.props;
    return (
      <div className="hall-container">
        <div className="hall-info">
          <div className="session-info">
            <img
              className="session-info__poster"
              src={movie.img}
              alt={movie.name}
            />
            <div className="session-info__container info">
              <div className="info__movie">{movie.name}</div>
              <div className="info__date">
                <EventIcon className="info__icon" />
                {new Date(+time).toLocaleString('en', OPTIONS_DATE)}
              </div>
              <div className="info__time">
                <ScheduleIcon className="info__icon" />
                {new Date(+time).toLocaleString('en', OPTIONS_TIME)}
              </div>
              <div className="info__location">
                <LocationIcon className="info__icon" />
                {cinema.name}
              </div>
              <div className="info__hall">
                <HallIcon className="info__icon" />
                hall: {hall.name}
              </div>
            </div>
          </div>
          <div className="hall">
            <div className="hall__screen"></div>
            <div className="hall__screen-shadow"></div>
            {/* <SelectSeats
              toggleSeat={this.props.onToggleSeat}
              selectedSeats={this.props.selectedSeats}
              boughtSeats={this.props.boughtSeats}
              cinemaId={cinema.id}
              movieId={movie.id}
              hallId={hall.id}
              time={time}
              seats={this.props.seats.hall}
            /> */}

            <div id="canvas"> </div>

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

          {/*  <div className="seats-information">
            <SeatsInfo
              selectedSeats={this.props.selectedSeats}
              cinemaId={cinema.id}
              movieId={movie.id}
              hallId={hall.id}
              time={time}
              clearInterval={this.props.clearInterval}
            />
          </div> */}
        </div>
      </div >
    );
  }
}

export default Hall;
