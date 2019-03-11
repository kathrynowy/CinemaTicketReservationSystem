import React, { Component } from 'react';
import './Calendar.scss';


class Calendar extends Component {
  render() {
    const DATE_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
    const today = new Date();
    const days = [];

    const WeekdayFormatter = new Intl.DateTimeFormat("ru", {
      weekday: "short"
    });
    const DayFormatter = new Intl.DateTimeFormat("ru", {
      day: "numeric"
    });

    days.push(today);
    for (let i = 0; i < 14; i++) {
      days.push(new Date(today.getTime() + DATE_IN_MILLISECONDS * (i + 1)));
    }

    const formattedDays = days.map((date, index) => ({
      weekday: WeekdayFormatter.format(date),
      day: DayFormatter.format(date),
      key: index
    }));

    return (
      <div className="calendar-div">
        <table>
          <tbody>
            <tr className="weekdays">
              {formattedDays.map((day) => <td key={day.key} className={(day.weekday === 'вс') || (day.weekday === 'сб') ? "we" : ''} ><span>{day.weekday}</span></td>)}
            </tr>
            <tr>
              {formattedDays.map((day) => <th key={day.key}><span className="date">{day.day}</span></th>)}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Calendar;
