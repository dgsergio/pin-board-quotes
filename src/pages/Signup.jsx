import React, { useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classes from './Sign.module.css';
import pin from '../assets/pin.svg';
import NoteContext from '../store/noteContext';

export const Signup = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passRef = useRef();
  const passRepRef = useRef();
  const { signup } = useContext(NoteContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (passRef.current.value !== passRepRef.current.value) {
      setLoading(false);
      return setError('Passwords do not match');
    }
    try {
      const response = await signup(emailRef.current.value, passRef.current.value);
      navigate('/');
    } catch (error) {
      const errorCode = error.code;
      setError('Fail to sign up: '+errorCode)
    }
    setLoading(false);
  };

  return (
    <>
      <div className={classes.backdrop} />
      <div className={classes.container}>
        <div className={classes.content}>
          <h1>Sign Up</h1>
          {error && <p className={classes.danger}>{error}</p>}
          <form onSubmit={submitHandler}>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" ref={emailRef} required />
            <label htmlFor="password">Password</label>
            <input id="password" type="password" ref={passRef} required />
            <label htmlFor="password-repeat">Repeat Password</label>
            <input
              id="password-repeat"
              type="password"
              ref={passRepRef}
              required
            />
            <div className={classes.btn} >
              <img src={pin} alt="a cork board pin" />
              <button type="submit" disabled={loading} >Sign Up</button>
            </div>
          </form>
          <div className={classes.footer}>
            Already have an account? <Link to={'/login'}>Log in</Link>
          </div>
        </div>
      </div>
    </>
  );
};
