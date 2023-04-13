import classes from './Note.module.css';
import pin from '../assets/pin.svg';
import { randomNro } from '../functions';

const Note = ({ note }) => {
  return (
    <div className={classes.wrapper}>
      <div style={{transform: `rotate(${randomNro(5, true)}deg)`}}>
        <img
          src={pin}
          alt="a red pin that you can grab and the note will be erase"
        />
        <div className={classes.note + ' ' + classes[note.color]}>
          <p>{note.quote}</p>
          <div className={classes.footer}>@{note.author}</div>
        </div>
      </div>
    </div>
  );
};

export default Note;
