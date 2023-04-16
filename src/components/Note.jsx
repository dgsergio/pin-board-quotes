import classes from './Note.module.css';
import pin from '../assets/pin.svg';
import { randomNro } from '../functions';
import { useContext } from 'react';
import NoteContext from '../store/noteContext';
import useFetch from '../hooks/useFetch';

const Note = ({ note }) => {
  const { notesDispatch } = useContext(NoteContext);
  const { sendReq } = useFetch();
  const editHandler = () => notesDispatch({ type: 'TOGGLE_SET_NOTE' });

  const deleteHandler = async () => {
    await sendReq({
      url: import.meta.env.VITE_FIREBASE_URL + 'notes/' + note.id + '.json',
      method: 'DELETE',
    });
    notesDispatch({ type: 'DELETE_NOTE', payload: note.id });
  };

  return (
    <div className={classes.wrapper}>
      <div style={{ transform: `rotate(${randomNro(4, true)}deg)` }}>
        <img
          onClick={deleteHandler}
          src={pin}
          alt="a red pin that you can grab and the note will be erase"
        />
        <div
          onClick={editHandler}
          className={classes.note + ' ' + classes[note.color]}
        >
          <p>{note.quote}</p>
          <div className={classes.footer}>@{note.author}</div>
        </div>
      </div>
    </div>
  );
};

export default Note;
