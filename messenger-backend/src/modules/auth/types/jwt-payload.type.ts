export interface JwtPayload {
  sub: string;
  login: string;
}

export interface ClientData {
  user?: {
    userId: string;
    login: string;
  };
}

export interface WsAuth {
  token?: string;
}
