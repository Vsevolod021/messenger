import { Button } from '@mui/material';
import { useAuthStore } from '@/features/auth/model/auth.store';
import { PagesRoutes } from '@/shared/config';
import { NavLink, Outlet } from 'react-router-dom';

import styles from './Layout.module.scss';

const Layout = () => {
  const logOut = useAuthStore((state) => state.logOut);

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <NavLink to={PagesRoutes.FEED}>Лента</NavLink>
        <NavLink to={PagesRoutes.MESSAGES}>Сообщения</NavLink>
        <Button onClick={() => void logOut()} className={styles.exit}>
          Выйти
        </Button>
      </header>

      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
