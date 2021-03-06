import React, { Component } from 'react';
import './Calendar.scss';


class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      day: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        0,
        0,
        0
      ).getTime()
    }
  }

  handleSelect = (day) => {
    this.props.selectDay(day.getTime());
  }

  formatDays = (days) => {
    const WeekdayFormatter = new Intl.DateTimeFormat("en-US", {
      weekday: "short"
    });
    const DayFormatter = new Intl.DateTimeFormat("ru-BY", {
      year: "numeric",
      month: "numeric",
      day: "numeric"
    });
    const formattedDays = days.map((date) => ({
      weekday: WeekdayFormatter.format(date),
      day: DayFormatter.format(date),
      date
    }));
    return formattedDays;
  }

  render() {
    const formattedDays = this.formatDays(this.props.days);
    return (
      <div className="calendar">
        <table className="calendar__table">
          <tbody>
            <tr>
              {
                formattedDays.map((day) => {
                  return (
                    <td
                      key={day.date}
                      className={day.weekday === 'Sat' || day.weekday === 'Sun'
                        ? "calendar__weekend"
                        : 'calendar__weekday'}>
                      <span className="day">{day.weekday}</span>
                    </td>
                  );
                })
              }
            </tr>
            <tr>{
              formattedDays.map((day, index) => {
                return (
                  <th key={day.date} onClick={() => this.handleSelect(day.date)} >
                    <span
                      className={
                        (new Date(this.state.day).getTime() === new Date(day.date).getTime())
                          ? "calendar__day day day_click"
                          : "calendar__day day"
                      }
                      onClick={() => this.setState({ day: day.date })}>
                      {(day.day).split('.')[0]}
                    </span>
                  </th>
                );
              })
            }
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Calendar;
