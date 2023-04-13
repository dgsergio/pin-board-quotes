import React, { useContext, useRef, useState } from 'react';
import Modal from './UI/Modal';
import classes from './NewNote.module.css';
import NoteContext from '../store/noteContext';

const NewNote = () => {
  const [error, setError] = useState('');
  const { notesDispatch } = useContext(NoteContext);
  const textAreaRef = useRef();
  const inputRef = useRef();
  const cancelHandler = () => notesDispatch({ type: 'TOGGLE_NEW_NOTE' });
  const submitHandler = (e) => {
    e.preventDefault();
    if (!textAreaRef.current.value.trim()) {
      setError('Please enter a valid note in the quote field.');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }
    notesDispatch({
      type: 'ADD_NEW_NOTE',
      payload: {
        quote: textAreaRef.current.value,
        author: inputRef.current.value,
      },
    });
  };

  return (
    <Modal>
      <div className={classes.container}>
        <h2>Quote</h2>
        <form onSubmit={submitHandler}>
          {error && <div className={classes.message}>{error}</div>}
          <textarea ref={textAreaRef} placeholder="Type your phrease here..." />
          <div className={classes.author}>
            <label htmlFor="author">Author: </label>
            <input
              id="author"
              type="text"
              ref={inputRef}
              placeholder="Leave it blank @anonymous"
            />
          </div>
          <div className={classes.btns}>
            <button type="button" onClick={cancelHandler}>
              Cancel
            </button>
            <button type="submit" disabled={error && true}>
              Send Note
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default NewNote;
