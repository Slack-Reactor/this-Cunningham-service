import React from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import css from '../styles/calendar.module.css';

// plan is to pass in an array of blackout dates
const Calendar = ({ blackouts }) => (
  <div className={css['calendar-container']}>
    Calendar Here!
    <DayPicker disabledDays={blackouts} />
  </div>
);

export default Calendar;
