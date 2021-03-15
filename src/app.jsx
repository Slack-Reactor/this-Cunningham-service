/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import Attraction from './components/Attraction';
import Modal from './components/Modal';
import './styles/styles.css';
import css from './styles/modal.module.css';

const tripLogo = 'https://fec-tripadvisor-images.s3.us-east-2.amazonaws.com/images/travel_sherpa_icon.svg';
const initialLoginMessage = 'Login will be stored in current session';

const Login = ({ setWelcomeModal }) => {
  const [loginMessage, setLoginMessage] = useState(initialLoginMessage);

  const loginRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    loginRef.current.focus();
  }, []);

  const checkLogin = () => {
    if (loginRef.current.value === 'demo' && passwordRef.current.value === 'demo') {
      setWelcomeModal(false);
      sessionStorage.setItem('login', true);
      setLoginMessage('');
    } else {
      setLoginMessage('Username/password is incorrect');
    }
  };

  return (
    <div className={css.loginModal}>
      <h3 className={css.loginHeader}>Travel Sherpa Demo</h3>
      <img className={css.loginIcon} src={tripLogo} alt="goat icon" />
      <h4 className={css.loginHeader}>Please Login</h4>
      <hr />
      <p><strong>username:</strong> demo, <strong>password:</strong> demo</p>
      <div>
        <input name="login" ref={loginRef} type="text" placeholder="username" />
        <input name="password" type="text" ref={passwordRef} placeholder="password" />
      </div>
      <p>{loginMessage}</p>
      <button className={css.loginBtn} onClick={checkLogin}>Enter</button>
    </div>
  );
};

const App = () => {
  const [welcomeModal, setWelcomeModal] = useState(true);
  const [firstTime, setFirstTime] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem('login') === 'true') {
      setWelcomeModal(false);
      setFirstTime(false);
    } else {
      setWelcomeModal(true);
    }
  }, []);

  return (
    <>
      {welcomeModal ? (
        <Modal>
          <Login setWelcomeModal={setWelcomeModal} />
        </Modal>
      ) : <Attraction firstTime={firstTime} />}
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
