import z from 'zod';

export type LoginDto = {
  login: string;
  password: string;
};

export type RegisterDto = {
  login: string;
  password: string;
  displayName: string;
};

export const AuthResponceDtoSchema = z.object({
  accessToken: z.string()
});

export type AuthResponseDto = z.infer<typeof AuthResponceDtoSchema>;
