import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './global.css';
import HomePage from './pages/Home';
import { NoteContextProvider } from './store/noteContext';
import { Signup } from './pages/Signup';
import { Login } from './pages/Login';
import Private from './pages/Private';
import ErrorPage from './pages/Error';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Private />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      }
    ]
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NoteContextProvider>
      <RouterProvider router={router} />
    </NoteContextProvider>
  </React.StrictMode>
);
