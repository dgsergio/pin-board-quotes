import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import NoteContext from '../store/noteContext';
import { Login } from './Login';

const Private = () => {
  const { currentUser } = useContext(NoteContext);

  return <>{currentUser ? <Outlet /> : <Login />}</>;
};

export default Private;
