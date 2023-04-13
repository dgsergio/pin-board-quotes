import classes from './Home.module.css';
import Note from '../components/Note';
import { useContext } from 'react';
import NoteContext from '../store/noteContext';
import addNote from '../assets/newNote.svg';
import NewNote from '../components/NewNote';

const HomePage = () => {
  const { notesState, notesDispatch } = useContext(NoteContext);
  const { notes, showNewNote } = notesState;

  const addBtnHandler = () => {
    notesDispatch({ type: 'TOGGLE_SET_NOTE' });
  };

  return (
    <>
      {showNewNote && <NewNote />}
      <div className={classes.board}>
        {notes.map((e) => (
          <Note key={e.id} note={e} />
        ))}
      </div>
      <button onClick={addBtnHandler} className={notes.length!==0?classes.addBtn:classes['no-note-add']}>
        <img src={addNote} alt="Add a new note to the board" />
      </button>
    </>
  );
};

export default HomePage;
