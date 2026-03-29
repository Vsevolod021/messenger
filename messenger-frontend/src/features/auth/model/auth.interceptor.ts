import { axiosApiInstance } from '@/shared/api';
import { queryClient } from '@/shared/config';
import { removeFromSessionStorage } from '@/shared/utils';

export function setupAuthInterceptor(onUnauthorized: () => void) {
  axiosApiInstance.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response?.status === 401) {
        removeFromSessionStorage('accessToken');
        queryClient.clear();

        onUnauthorized();
      }

      return Promise.reject(err);
    }
  );
}
