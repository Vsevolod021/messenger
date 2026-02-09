import { BadRequestException, Injectable } from '@nestjs/common';
import type { LoginDto, RegisterDto } from './auth.dto';
import { UsersService } from '../users/users.service';
import { saltRounds } from 'src/modules/auth/constants/auth.constants';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { login, password } = loginDto;

    const user = await this.usersService.findByLogin(login);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }

    const payload = { sub: user._id, login: user.login };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterDto) {
    const { login, password, displayName } = registerDto;

    if (!login || !password || !displayName) {
      throw new BadRequestException('Missing required fields');
    }

    const existingUser = await this.usersService.findByLogin(login);

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = await this.usersService.create({
      login,
      passwordHash,
      displayName,
    });

    const payload = { sub: user._id, login: user.login };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
