import { useQuery } from '@tanstack/react-query';
import { fetchUsersApi } from './fetchUsersApi/fetchUsersApi';
import { fetchMyUserApi } from './fetchMyUserApi/fetchMyUser';

export const usersQueries = {
  _def: ['users'],
  users: () => ({
    queryKey: [...usersQueries._def, 'users'],
    queryFn: () => fetchUsersApi()
  }),
  my: () => ({
    queryKey: [...usersQueries._def, 'my'],
    queryFn: () => fetchMyUserApi()
  })
};

export const useUsersQuery = () => {
  return useQuery(usersQueries.users());
};

export const useMyUserQuery = () => {
  return useQuery(usersQueries.my());
};
