import classes from './Note.module.css';
import pin from '../assets/pin.svg';

const Note = ({note}) => {
  return (
    <div className={classes.wrapper}>
      <img src={pin} alt="a red pin that you can grab and the note will be erase" />
      <div className={classes.note}>
        <p>{note.quote}</p>
        <div className={classes.footer}>@{note.author}</div>
      </div>
    </div>
  );
};

export default Note;
