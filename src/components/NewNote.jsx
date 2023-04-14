import React, { useContext, useEffect, useRef, useState } from 'react';
import Modal from './UI/Modal';
import classes from './NewNote.module.css';
import NoteContext from '../store/noteContext';

const NewNote = () => {
  const { notesDispatch, notesState, currentUser } = useContext(NoteContext);
  const noteSelected = notesState.notes.find(
    (e) => e.id === notesState.idSelected
  );
  const [error, setError] = useState('');
  const [colorSelected, setColorSelected] = useState('white');
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
        color: colorSelected === 'white' ? '' : colorSelected,
        id: notesState.idSelected,
      },
    });
  };

  useEffect(() => {
    if (noteSelected) setColorSelected(noteSelected.color);
  }, []);
  return (
    <Modal>
      <div
        className={classes.container}
        style={{ background: `var(--${colorSelected?colorSelected:'white'}-note` }}
      >
        <h2>Quote</h2>
        <form onSubmit={submitHandler}>
          {error && <div className={classes.message}>{error}</div>}
          <textarea
            defaultValue={noteSelected ? noteSelected.quote : ''}
            ref={textAreaRef}
            placeholder="Type your phrase here..."
          />
          <div className={classes.author}>
            <div>
              <label htmlFor="author">Author: </label>
              <input
                id="author"
                type="text"
                ref={inputRef}
                placeholder="Leave it blank @anonymous"
                defaultValue={noteSelected ? noteSelected.author : currentUser.email.split('@')[0]}
              />
            </div>
            <div className={classes['squares-color']}>
              <div
                onClick={() => setColorSelected('pink')}
                className={classes.pink + ' ' + classes.square}
              />
              <div
                onClick={() => setColorSelected('yellow')}
                className={classes.yellow + ' ' + classes.square}
              />
              <div
                onClick={() => setColorSelected('green')}
                className={classes.green + ' ' + classes.square}
              />
              <div
                onClick={() => setColorSelected('blue')}
                className={classes.blue + ' ' + classes.square}
              />
              <div
                onClick={() => setColorSelected('white')}
                className={classes.white + ' ' + classes.square}
              />
            </div>
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
