/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import Attraction from './components/Attraction';
import Modal from './components/Modal';
import './styles/styles.css';
import css from './styles/modal.module.css';

const initialLoginMessage = 'Login will be stored in current session';

const Login = ({ setWelcomeModal }) => {
  const [loginMessage, setLoginMessage] = useState(initialLoginMessage);

  const loginRef = useRef();
  const passwordRef = useRef();

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
      <h3>Travel Sherpa Demo</h3>
      <h4>Please Login</h4>
      <p><strong>username:</strong> demo, password: demo</p>
      <div>
        <input name="login" ref={loginRef} type="text" placeholder="username" />
        <input type="text" ref={passwordRef} placeholder="password" />
      </div>
      <button onClick={checkLogin}>Enter</button>
      <p>{loginMessage}</p>
    </div>
  );
};

const App = () => {
  const [welcomeModal, setWelcomeModal] = useState(true);

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
