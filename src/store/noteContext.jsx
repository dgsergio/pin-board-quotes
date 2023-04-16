import { createContext, useEffect, useReducer, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../firebase';
import useFetch from '../hooks/useFetch';
import { transformData } from '../functions';

const NoteContext = createContext();

const initialNotesState = {
  notes: [],
  showNewNote: false,
};

const notesReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_SET_NOTE':
      return {
        ...state,
        showNewNote: !state.showNewNote,
      };

    case 'GET_DB_NOTES':
      return { ...state, notes: action.payload };

    case 'ADD_NOTE':
      return {
        notes: [action.payload, ...state.notes],
        showNewNote: false,
      };

    case 'EDIT_NOTE':
      const newNotes = state.notes.map((e) =>
        e.id === action.payload.id ? action.payload : e
      );
      return { notes: newNotes, showNewNote: false };

    case 'DELETE_NOTE':
      const filteredNotes = state.notes.filter((e) => e.id !== action.payload);
      return { ...state, notes: filteredNotes };

    default:
      return state;
  }
};

export const NoteContextProvider = ({ children }) => {
  const [notesState, notesDispatch] = useReducer(
    notesReducer,
    initialNotesState
  );

  const [currentUser, setCurrentUser] = useState();
  const { sendReq } = useFetch();

  const signup = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const getNotes = async () => {
      const data = await sendReq({
        url: import.meta.env.VITE_FIREBASE_URL + 'notes.json',
      });
      const notes = transformData(data).reverse();
      notesDispatch({ type: 'GET_DB_NOTES', payload: notes });
    };
    getNotes();
  }, []);

  return (
    <NoteContext.Provider
      value={{ notesState, notesDispatch, signup, login, logout, currentUser }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default NoteContext;
