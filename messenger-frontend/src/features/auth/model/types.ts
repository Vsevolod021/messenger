export interface AuthResponseDto {
  accessToken: string
}

export type LoginRequestDto = {
  login: string
  password: string
}

export type RegisterRequestDto = {
  login: string
  password: string
  displayName: string //fixMe. Сделать username
}
