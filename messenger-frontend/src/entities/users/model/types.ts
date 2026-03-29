import z from 'zod';

export const UserSchema = z.object({
  _id: z.string(),
  login: z.string(),
  displayName: z.string(),
  createdAt: z.string(),
  updatedAt: z.string()
});
export type User = z.infer<typeof UserSchema>;

export const UsersSchema = z.array(UserSchema);
export type Users = z.infer<typeof UsersSchema>;
