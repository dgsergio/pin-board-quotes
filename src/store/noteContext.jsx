import { createContext, useReducer } from 'react';
import { DUMMY_NOTES } from '../DUMMY_NOTES';
import { randomNro } from '../functions';

const NoteContext = createContext();

const initialNotesState = {
  notes: [...DUMMY_NOTES],
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

    default:
      return state;
  }
};

export const NoteContextProvider = ({ children }) => {
  const [notesState, notesDispatch] = useReducer(
    notesReducer,
    initialNotesState
  );

  return (
    <NoteContext.Provider value={{ notesState, notesDispatch }}>
      {children}
    </NoteContext.Provider>
  );
};

export default NoteContext;
