/* eslint-disable react/prop-types */
import React from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import css from '../styles/calendar.module.css';

// plan is to pass in an array of blackout dates
const Calendar = ({ blackouts }) => (
  <div className={css['calendar-container']}>
    <style>
      {`
        .DayPicker-Day--disabled {
          color: rgba(31, 29, 29, 0.3);
        }
        .DayPicker-Day--today {
          color: black;
          background-color: #34E0A1;
        }
        .DayPicker-Day:hover {
          cursor: pointer;
          color: #34E0A1;
        }
      `}
    </style>
    <DayPicker disabledDays={blackouts.map((item) => new Date(item))} />
  </div>
);

export default Calendar;
