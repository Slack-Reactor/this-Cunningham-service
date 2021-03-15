/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React from 'react';
import css from '../styles/modal.module.css';

const IntroWidget = ({ introCycle, setIntroCycle }) => (
  <div key={introCycle} className={`${css.introPopups}`}>
    {introCycle === 0 && (
      'Welcome to Travel Sherpa! I see this is your first time!  This is a demo, '
    )}
    {introCycle === 1 && 'Click the Heart to bookmark your favorite attractions'}
    {introCycle === 2 && 'Here you can check available dates and purchase tickets'}
    {introCycle === 3 && 'To cycle through different attractions in demo mode click on the Travel Sherpa logo'}
    {introCycle === 4 && 'Hover over image and click "<" or ">" to view additional images'}
    <button className={css.cycleBtn} onClick={() => setIntroCycle((c) => c + 1)}>Next</button>
  </div>
);

export default IntroWidget;
