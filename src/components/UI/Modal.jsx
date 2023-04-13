import { useContext } from 'react';
import classes from './Modal.module.css';
import { createPortal } from 'react-dom';
import NoteContext from '../../store/noteContext';

const ModalBackDrop = () => {
  const {notesDispatch} = useContext(NoteContext);

  return <div className={classes.backdrop} onClick={()=> 
    notesDispatch({type: 'TOGGLE_SET_NOTE'})}/>;
};
const ModalOverlay = ({children}) => {
  return <div className={classes.overlay}>{children}</div>;
};

const Modal = ({ children }) => {
  return (
    <>
      {createPortal(
        <ModalBackDrop />,
        document.getElementById('modal-backdrop')
      )}
      {createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        document.getElementById('modal-overlay')
      )}
    </>
  );
};

export default Modal;
