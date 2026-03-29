import { createBrowserRouter, Navigate } from 'react-router-dom';
import { PagesRoutes } from '@/shared/config';

import Messages from '@/pages/Messages/Messages';
import Login from '@/pages/Login/Login';
import Feed from '@/pages/Feed/Feed';
import { AuthInterceptor } from '@/features/auth';
import Register from '@/pages/Register/Register';
import Layout from '../layouts/Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthInterceptor />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: PagesRoutes.FEED,
            element: <Feed />
          },
          {
            path: PagesRoutes.MESSAGES,
            element: <Messages />
          }
        ]
      },
      {
        path: PagesRoutes.LOGIN,
        element: <Login />
      },
      {
        path: PagesRoutes.REGISTER,
        element: <Register />
      },
      {
        path: '*',
        element: <Navigate to={PagesRoutes.FEED} replace />
      }
    ]
  }
]);
