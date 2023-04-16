import React, { useContext } from 'react'
import Nav from '../components/Nav'
import NoteContext from '../store/noteContext';
import classes from './Error.module.css';

const ErrorPage = () => {
    const { currentUser } = useContext(NoteContext);

  return (
    <>
        <Nav email={currentUser.email} />
        <main className={classes.main}>
        <h3>Something went wrong</h3>
        <h4>We'll be back soon!</h4>
      </main>
    </>
  )
}

export default ErrorPage