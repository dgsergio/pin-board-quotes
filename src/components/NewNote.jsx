import React, { useContext } from 'react';
import Modal from './UI/Modal';
import classes from './NewNote.module.css';
import NoteContext from '../store/noteContext';

const NewNote = () => {
    const { notesDispatch } = useContext(NoteContext);
    const cancelHandler = () =>{
        notesDispatch({type: 'TOGGLE_NEW_NOTE'})
    }
    
  return (
    <Modal>
      <div className={classes.container}>
        <h2>Quote</h2>
        <form>
          <textarea placeholder="Type your phrease here..."/>
          <div className={classes.btns}>
            <button type="cancel" onClick={cancelHandler}>Cancel</button>
            <button type="submit">Send Note</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default NewNote;
