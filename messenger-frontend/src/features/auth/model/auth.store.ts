import { usersQueries } from '@/entities/users/api/queries';
import { queryClient } from '@/shared/config';
import { create } from 'zustand';
import {
  removeFromSessionStorage,
  getFromSessionStorage,
  setToSessionStorage
} from '@/shared/utils';

export type AuthStatus = 'unknown' | 'authorized' | 'unauthorized';

interface AuthState {
  status: AuthStatus;
  init: () => Promise<void>;
  logIn: (accessToken: string) => void;
  logOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  status: 'unknown',

  init: async () => {
    try {
      const token = getFromSessionStorage('accessToken');

      if (!token) {
        set({ status: 'unauthorized' });
        return;
      }

      await queryClient.fetchQuery(usersQueries.my());
      set({ status: 'authorized' });
    } catch {
      await useAuthStore.getState().logOut();
    }
  },

  logIn: (accessToken: string) => {
    setToSessionStorage('accessToken', accessToken);
    set({ status: 'authorized' });
  },

  logOut: async () => {
    removeFromSessionStorage('accessToken');
    set({ status: 'unauthorized' });
    await queryClient.clear();
  }
}));
