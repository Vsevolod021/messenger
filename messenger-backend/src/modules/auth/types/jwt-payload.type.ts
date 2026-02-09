import { JwtStrategy } from '../strategies/jwt.strategy';
import { Request } from 'express';

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

export interface RequestWithUser extends Request {
  user: ReturnType<JwtStrategy['validate']>;
}
