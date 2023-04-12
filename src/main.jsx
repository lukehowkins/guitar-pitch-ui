import './constants/colors.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import Loading from './components/loading';
import router from './pages';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} fallbackElement={Loading} />
  </React.StrictMode>
);
