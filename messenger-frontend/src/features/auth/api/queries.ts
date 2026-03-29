import { usersQueries } from '@/entities/users/api/queries';
import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { queryClient } from '@/shared/config';

import type { AuthResponseDto, LoginDto, RegisterDto } from '../model/types';
import { register } from './register/register';
import { login } from './login/login';

export const useLoginMutation = (
  options?: UseMutationOptions<AuthResponseDto, Error, LoginDto>
) => {
  return useMutation<AuthResponseDto, Error, LoginDto>({
    mutationFn: login,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: usersQueries._def });
      options?.onSuccess?.(...args);
    }
  });
};

export const useRegisterMutation = (
  options?: UseMutationOptions<AuthResponseDto, Error, RegisterDto>
) => {
  return useMutation<AuthResponseDto, Error, RegisterDto>({
    mutationFn: register,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: usersQueries._def });
      options?.onSuccess?.(...args);
    }
  });
};
