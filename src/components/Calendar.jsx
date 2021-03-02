import React from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

const Calendar = ({ blackouts }) => (
  <div className={css['calendar-container']}>
    Calendar Here!
    <DayPicker />
  </div>
);

export default Calendar;
