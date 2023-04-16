import React, { useContext, useEffect, useRef, useState } from 'react';
import Modal from './UI/Modal';
import classes from './NewNote.module.css';
import NoteContext from '../store/noteContext';
import useFetch from '../hooks/useFetch';

const NewNote = () => {
  const { notesDispatch, notesState, currentUser } = useContext(NoteContext);
  const noteSelected = notesState.notes.find(
    (e) => e.id === notesState.idSelected
  );
  const [error, setError] = useState('');
  const [colorSelected, setColorSelected] = useState('white');
  const textAreaRef = useRef();
  const inputRef = useRef();
  const { sendReq } = useFetch();

  const cancelHandler = () => notesDispatch({ type: 'TOGGLE_SET_NOTE' });

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!textAreaRef.current.value.trim()) {
      setError('The quote field must not be empty');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }

    const noteCreated = {
      quote: textAreaRef.current.value,
      author: inputRef.current.value.trim()
        ? inputRef.current.value
        : 'anonymous',
      color: colorSelected === 'white' ? '' : colorSelected,
    };

    if (noteSelected) {
      sendReq({
        url:
          import.meta.env.VITE_FIREBASE_URL +
          'notes/' +
          noteSelected.id +
          '.json',
        method: 'PATCH',
        body: noteCreated,
        headers: { 'Content-Type': 'application/json' },
      });

      notesDispatch({
        type: 'EDIT_NOTE',
        payload: {
          ...noteCreated,
          id: notesState.idSelected,
        },
      });
      return;
    }

    const data = await sendReq({
      url: import.meta.env.VITE_FIREBASE_URL + 'notes.json',
      method: 'POST',
      body: noteCreated,
      headers: { 'Content-Type': 'application/json' },
    });

    notesDispatch({
      type: 'ADD_NOTE',
      payload: { ...noteCreated, id: data.name },
    });
  };

  useEffect(() => {
    if (noteSelected) setColorSelected(noteSelected.color);
  }, []);

  return (
    <Modal>
      <div
        className={classes.container}
        style={{
          background: `var(--${colorSelected ? colorSelected : 'white'}-note`,
        }}
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
                defaultValue={
                  noteSelected
                    ? noteSelected.author
                    : currentUser.email.split('@')[0][0].toUpperCase() +
                      currentUser.email.split('@')[0].slice(1)
                }
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
