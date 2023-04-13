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
      let newColor = '';
      if (action.payload.id) {
        const newNotes = state.notes.map((e) =>
          e.id === action.payload.id
            ? {
                ...e,
                quote: action.payload.quote,
                author: action.payload.author.trim()
                  ? action.payload.author
                  : 'anonymous',
              }
            : e
        );
        return { notes: newNotes, showNewNote: false};
      }

      const nro = randomNro(5);
      if (nro === 1) newColor = 'yellow';
      if (nro === 2) newColor = 'blue';
      if (nro === 3) newColor = 'green';
      if (nro === 4) newColor = 'pink';
      return {
        notes: [
          {
            id: new Date(),
            quote: action.payload.quote,
            author: action.payload.author.trim()
              ? action.payload.author
              : 'anonymous',
            color: newColor,
          },
          ...state.notes,
        ],
        showNewNote: false,
      };

    case 'EDIT_NOTE':
      return { ...state, showNewNote: !state.showNewNote };
      
      case 'DELETE_NOTE':
        const filteredNotes = state.notes.filter(e=>e.id!==action.payload) 
        console.log(filteredNotes)
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
