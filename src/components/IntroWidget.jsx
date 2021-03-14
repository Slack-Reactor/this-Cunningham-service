import React, { useState, useEffect } from 'react';
import css from '../styles/modal.module.css';

const IntroWidget = ({ introCycle }) => (
  <div className={css[`introCycle${introCycle}`]}>

  </div>
);

export default IntroWidget;
