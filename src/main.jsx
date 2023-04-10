import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './global.css';
import HomePage from './pages/Home';
import { NoteContextProvider } from './store/noteContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NoteContextProvider>
      <RouterProvider router={router} />
    </NoteContextProvider>
  </React.StrictMode>
);
