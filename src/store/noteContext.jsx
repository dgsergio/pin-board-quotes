import { createContext, useEffect, useReducer, useState } from 'react';
import { DUMMY_NOTES } from '../DUMMY_NOTES';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../firebase';
import useFetch from '../hooks/useFetch';

const NoteContext = createContext();

const initialNotesState = {
  notes: [],
  idSelected: '',
  showNewNote: false,
};

const notesReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_SET_NOTE':
      return {
        ...state,
        idSelected: action.payload,
        showNewNote: !state.showNewNote,
      };

    case 'SET_NOTE':
      if (action.payload.id) {
        const newNotes = state.notes.map((e) =>
          e.id === action.payload.id
            ? {
                ...e,
                quote: action.payload.quote,
                color: action.payload.color,
                author: action.payload.author.trim()
                  ? action.payload.author
                  : 'anonymous',
              }
            : e
        );
        return { notes: newNotes, showNewNote: false };
      }

      return {
        notes: [
          {
            id: new Date(),
            quote: action.payload.quote,
            author: action.payload.author.trim()
              ? action.payload.author
              : 'anonymous',
            color: action.payload.color,
          },
          ...state.notes,
        ],
        showNewNote: false,
      };

    case 'EDIT_NOTE':
      return { ...state, showNewNote: !state.showNewNote };

    case 'DELETE_NOTE':
      const filteredNotes = state.notes.filter((e) => e.id !== action.payload);
      return { ...state, notes: filteredNotes };

    case 'GET_DB_NOTES':
      return {...state, notes: action.payload};

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
      const notes = await sendReq({
        url: 'https://pin-board-quotes-default-rtdb.europe-west1.firebasedatabase.app/notes.json/',
      });
      notesDispatch({type: 'GET_DB_NOTES', payload: notes})
    };
    getNotes()
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
