import classes from './Home.module.css';
import Note from '../components/Note';
import { useContext } from 'react';
import NoteContext from '../store/noteContext';
import addNote from '../assets/newNote.svg';
import NewNote from '../components/NewNote';
import Nav from '../components/Nav';
import useFetch from '../hooks/useFetch';
import Spinner from '../components/UI/Spinner';

const HomePage = () => {
  const { notesState, notesDispatch } = useContext(NoteContext);
  const { notes, showNewNote } = notesState;
  const { loading } = useFetch();

  const addBtnHandler = () => {
    notesDispatch({ type: 'TOGGLE_SET_NOTE' });
  };

  const { currentUser } = useContext(NoteContext);

  return (
    <>
      <Nav email={currentUser.email} />
      <div className={classes.phantom} onClick={addBtnHandler} />
      {showNewNote && <NewNote />}
      {loading ? (
        <Spinner />
      ) : (
        <div className={classes.board}>
          {notes.map((e) => (
            <Note key={e.id} note={e} />
          ))}
        </div>
      )}
      <button
        onClick={addBtnHandler}
        className={notes.length !== 0 ? classes.addBtn : classes['no-note-add']}
      >
        <img src={addNote} alt="Add a new note to the board" />
      </button>
    </>
  );
};

export default HomePage;
