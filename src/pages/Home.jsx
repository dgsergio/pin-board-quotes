import classes from './Home.module.css';
import { DUMMY_NOTES as notes } from '../DUMMY_NOTES';
import Note from '../components/Note';

const HomePage = () => {
  return (
    <div className={classes.board}>
      <div className={classes.content}>
        {notes.map((e) => (
          <Note key={e.id} note={e} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
