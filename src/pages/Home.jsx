import classes from './Home.module.css';
import Note from '../components/Note';
import { useContext } from 'react';
import NoteContext from '../store/noteContext';
import addNote from '../assets/newNote.svg';
import NewNote from '../components/NewNote';

const HomePage = () => {
  //Reasign when note is creted
  // const random = () => {
  //   switch (Math.floor(Math.random() * 5)) {
  //     case 1:
  //       return 'yellow';
  //     case 2:
  //       return 'blue';
  //     case 3:
  //       return 'green';
  //     case 4:
  //       return 'pink';
  //     default:
  //       return '';
  //   }
  // };

  const { notesState, notesDispatch } = useContext(NoteContext);
  const { notes, showNewNote } = notesState;

  const addBtnHandler = () => {
    notesDispatch({ type: 'TOGGLE_NEW_NOTE' });
  };

  return (
    <>
      {showNewNote && <NewNote />}
      <div className={classes.board}>
        {notes.map((e) => (
          <Note key={e.id} note={e} />
        ))}
      </div>
      <button onClick={addBtnHandler} className={classes.addBtn}>
        <img src={addNote} alt="Add a new note to the board" />
      </button>
    </>
  );
};

export default HomePage;
