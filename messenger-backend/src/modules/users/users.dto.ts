export interface CreateUserDto {
  login: string;
  passwordHash: string;
  displayName: string;
}
