import { createContext, useReducer } from 'react';
import { DUMMY_NOTES } from '../DUMMY_NOTES';

const NoteContext = createContext();

const initialNotesState = {
  notes: [ ...DUMMY_NOTES],
  showNewNote: false
}

const notesReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_NEW_NOTE':
      return {...state, showNewNote: !state.showNewNote};
    case 'DELETE':
      return state;
    default:
      return state;
  }
};

export const NoteContextProvider = ({ children }) => {
  const [notesState, notesDispatch] = useReducer(notesReducer, initialNotesState);

  return (
    <NoteContext.Provider value={{ notesState, notesDispatch }}>
      {children}
    </NoteContext.Provider>
  );
};

export default NoteContext;
