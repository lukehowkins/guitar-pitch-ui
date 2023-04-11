import { createBrowserRouter } from 'react-router-dom';
import Error from '../components/error';
import Layout from './layout';
import Home from './home';
import Debug from './debug';

export const HOME_PATH = '';
export const DEBUG_PATH = 'debug';

export default createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      errorElement: <Error message="This page does not exist" />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: DEBUG_PATH,
          element: <Debug />,
        },
      ],
    },
  ],
  { basename: '/guitar-pitch-ui/' }
);
