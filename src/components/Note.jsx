import classes from './Note.module.css';
import pin from '../assets/pin.svg';

const Note = ({ note }) => {
  const randomRotate = ()=>{
    let angle = Math.ceil(Math.random()*4);
    const negativePositive = Math.floor(Math.random()*2);
    if (negativePositive === 0) {
      angle = -angle
    }
    return {transform: `rotate(${angle}deg)`}
  }

  return (
    <div className={classes.wrapper} style={randomRotate()}>
      <img
        src={pin}
        alt="a red pin that you can grab and the note will be erase"
      />
      <div className={classes.note +' '+ classes[note.color]}>
        <p>{note.quote}</p>
        <div className={classes.footer}>@{note.author}</div>
      </div>
    </div>
  );
};

export default Note;
