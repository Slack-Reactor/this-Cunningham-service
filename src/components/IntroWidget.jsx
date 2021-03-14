/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import css from '../styles/modal.module.css';

const IntroWidget = () => {
  const [introCycle, setIntroCycle] = useState(0);

  return (
    <div key={introCycle} className={`${css[`introCycle${introCycle}`]} ${css.introPopups}`}>
      {introCycle === 0 && (
        'Welcome to Travel Sherpa! I see this is your first time!  This is a demo, '
      )}
      {introCycle === 1 && 'Like to bookmark your favorite attractions'}
      {introCycle === 2 && 'Here you can check available dates and purchase tickets'}
      {introCycle === 3 && 'To cycle through different attractions in demo mode click on the Travel Sherpa logo'}
      <button className={css.cycleBtn} onClick={() => setIntroCycle((c) => c + 1)}>Next</button>
    </div>
  );
};

export default IntroWidget;
