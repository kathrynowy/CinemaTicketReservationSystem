import React, { Component } from 'react';
import './Calendar.scss';


class Calendar extends Component {
  handleSelect = (day) => {
    this.props.selectDay(day.getTime());
  }

  formatDays = (days) => {
    const WeekdayFormatter = new Intl.DateTimeFormat("ru-BY", {
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
        <table>
          <tbody>
            <tr>{
              formattedDays.map((day) => {
                return (
                  <td
                    key={day.date}
                    className={(day.weekday === 'вс') || (day.weekday === 'сб')
                      ? "calendar__weekend"
                      : 'calendar__weekday'}>
                    <span className="day">{day.weekday}</span>
                  </td>
                );
              })
            }
            </tr>
            <tr>{
              formattedDays.map((day) => {
                return (
                  <th key={day.date} onClick={() => this.handleSelect(day.date)} >
                    <span className="calendar__day day">
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
