import React, { useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classes from './Sign.module.css';
import pin from '../assets/pin.svg';
import NoteContext from '../store/noteContext';

export const Login = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const emailRef = useRef();
  const passRef = useRef();
  const { login } = useContext(NoteContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await login(
        emailRef.current.value,
        passRef.current.value
      );
      navigate('/');
    } catch (error) {
      const errorCode = error.code;
      setError('Fail to log in: ' + errorCode);
    }
    setLoading(false);
  };

  return (
    <>
      <div className={classes.backdrop} />
      <div className={classes.container}>
        <div className={classes.content}>
          <h1>Log In</h1>
          {error && <p className={classes.danger}>{error}</p>}
          <form onSubmit={submitHandler}>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" ref={emailRef} required />
            <label htmlFor="password">Password</label>
            <input id="password" type="password" ref={passRef} required />
            <div
              onMouseOver={() => setShowPin(true)}
              onMouseLeave={() => setShowPin(false)}
              className={classes.btn}
            >
              <img
                className={`${classes['pin-img']} ${
                  !showPin && classes['display-none']
                }`}
                src={pin}
                alt="a cork board pin"
              />
              <button type="submit" disabled={loading}>
                Log In
              </button>
            </div>
          </form>
          <div className={classes.footer}>
            Need an account? <Link to={'/signup'}>Sign Up</Link>
          </div>
        </div>
      </div>
    </>
  );
};
