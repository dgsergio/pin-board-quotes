import { createContext, useReducer } from 'react';
import { DUMMY_NOTES } from '../DUMMY_NOTES';
import { randomNro } from '../functions';

const NoteContext = createContext();

const initialNotesState = {
  notes: [...DUMMY_NOTES],
  showNewNote: false,
};

const notesReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_NEW_NOTE':
      return { ...state, showNewNote: !state.showNewNote };
    case 'ADD_NEW_NOTE':
      let newColor = '';
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

    case 'DELETE':
      return state;
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
