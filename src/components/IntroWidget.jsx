import React, { useState, useEffect } from 'react';
import css from '../styles/modal.module.css';

const IntroWidget = ({ introCycle }) => (
  <div className={css[`introCycle${introCycle}`]}>
    {introCycle === 0 && (
      'Welcome to Travel Sherpa! I see this is your first time!'
    )}
  </div>
);

export default IntroWidget;
