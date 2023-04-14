import { useNavigate } from 'react-router-dom';
import classes from './Nav.module.css';
import { useContext } from 'react';
import NoteContext from '../store/noteContext';


const Nav = ({email}) => {
  const navigate = useNavigate();
  const {logout} = useContext(NoteContext);

  const logoutHandler = () => {
    logout();
    navigate('/login');
  }
  
  return (
    <div className={classes.container}>
      <ul>
        <li>({email})</li>
        <li onClick={logoutHandler} className={classes.logout}>Log out</li>
      </ul>
    </div>
  );
};

export default Nav;