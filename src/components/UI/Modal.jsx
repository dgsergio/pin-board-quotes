import classes from './Modal.module.css';
import { createPortal } from 'react-dom';

const ModalBackDrop = () => {
  return <div className={classes.backdrop} />;
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
