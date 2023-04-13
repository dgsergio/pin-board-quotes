import React, { useContext, useRef, useState } from 'react';
import Modal from './UI/Modal';
import classes from './NewNote.module.css';
import NoteContext from '../store/noteContext';

const NewNote = () => {
  const { notesDispatch, notesState } = useContext(NoteContext);
  const noteSelected = notesState.notes.find(
    (e) => e.id === notesState.idSelected
  );
  const [error, setError] = useState('');
  const textAreaRef = useRef();
  const inputRef = useRef();

  const cancelHandler = () => notesDispatch({ type: 'TOGGLE_SET_NOTE' });
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
      type: 'SET_NOTE',
      payload: {
        quote: textAreaRef.current.value,
        author: inputRef.current.value,
        id: notesState.idSelected,
      },
    });
  };

  let containerStyles = classes.container;
  if (noteSelected) {
    containerStyles = `${classes.container} ${classes[noteSelected.color]}`;
  }

  return (
    <Modal>
      <div className={containerStyles}>
        <h2>Quote</h2>
        <form onSubmit={submitHandler}>
          {error && <div className={classes.message}>{error}</div>}
          <textarea
            defaultValue={noteSelected ? noteSelected.quote : ''}
            ref={textAreaRef}
            placeholder="Type your phrease here..."
          />
          <div className={classes.author}>
            <label htmlFor="author">Author: </label>
            <input
              id="author"
              type="text"
              ref={inputRef}
              placeholder="Leave it blank @anonymous"
              defaultValue={noteSelected ? noteSelected.author : ''}
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
