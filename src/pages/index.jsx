import { createBrowserRouter } from 'react-router-dom';
import Error from '../components/error';
import Layout from './layout';
import HomePage from './home';
import DebugPage from './debug';
import UserPage from './user';
import MetronomePage from './metronome';
import TabPage from './tab';

export const HOME_PATH = '';
export const DEBUG_PATH = 'debug';
export const METRONOME_PATH = 'metronome';
export const TAB_PATH = 'tab';
export const USER_PATH = 'user';

export default createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      errorElement: <Error message="This page does not exist" />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: TAB_PATH,
          element: <TabPage />,
        },
        {
          path: METRONOME_PATH,
          element: <MetronomePage />,
        },
        {
          path: USER_PATH,
          element: <UserPage />,
        },
        {
          path: DEBUG_PATH,
          element: <DebugPage />,
        },
      ],
    },
  ],
  { basename: '/guitar-pitch-ui/' },
);
