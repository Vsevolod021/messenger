import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { PagesRoutes } from '@/shared/config';

import { setupAuthInterceptor } from '../../model/auth.interceptor';
import { useAuthStore } from '../../model/auth.store';
import Loader from '../Loader/Loader';

const PUBLIC_ROUTES = [PagesRoutes.LOGIN, PagesRoutes.REGISTER];

const AuthInterceptor = React.memo(() => {
  const navigate = useNavigate();
  const location = useLocation();

  const { status, init, logOut } = useAuthStore();

  React.useEffect(() => {
    setupAuthInterceptor(async () => {
      await logOut();
      navigate(PagesRoutes.LOGIN, { replace: true });
    });
  }, [logOut, navigate]);

  React.useEffect(() => {
    if (status === 'unknown') {
      void init();
    }
  }, [status, init]);

  React.useEffect(() => {
    if (status === 'unknown') {
      return;
    }

    const isPublicRoute = PUBLIC_ROUTES.includes(
      location.pathname as (typeof PUBLIC_ROUTES)[number]
    );

    if (status === 'authorized' && isPublicRoute) {
      navigate(PagesRoutes.FEED, { replace: true });
    }

    if (status === 'unauthorized' && !isPublicRoute) {
      navigate(PagesRoutes.LOGIN, { replace: true });
    }
  }, [status, location.pathname, navigate]);

  if (status === 'unknown') {
    return <Loader />;
  }

  return <Outlet />;
});

export default AuthInterceptor;
