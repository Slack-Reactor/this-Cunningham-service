/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import Attraction from './components/Attraction';
import Modal from './components/Modal';
import './styles/styles.css';
import css from './styles/modal.module.css';

const Login = ({ setWelcomeModal, loginMessage }) => {
  const demoLogin = () => {
    setWelcomeModal(false);
  };
  const loginRef = useRef();
  const passwordRef = useRef();

  const checkLogin = () => {
    if (loginRef.current.value === 'demo' && passwordRef.current.value === 'demo') {
      setWelcomeModal(false);
      sessionStorage.setItem('login', true);
    } else {

    }
  };

  return (
    <div className={css.loginModal}>
      <h1>Welcome to the Travel Sherpa Demo!</h1>
      <p>Please login with username: "demo" and password: "demo"</p>
      <div>
        <input name="login" ref={loginRef} type="text" placeholder="username" />
        <input type="password" ref={passwordRef} placeholder="password" />
        <button onClick={checkLogin}>Enter</button>
        <p>{loginMessage}</p>
      </div>
    </div>
  );
};

const App = () => {
  const [welcomeModal, setWelcomeModal] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');

  useEffect(() => {
    if (sessionStorage.getItem('login') === 'true') {
      setWelcomeModal(false);
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
      ) : <Attraction />}
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
