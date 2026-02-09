import { Body, Controller, Get, Headers, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import type { Request } from 'express';
import type { RequestWithUser } from '../auth/types/jwt-payload.type';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get('my')
  async findMy(@Req() req: RequestWithUser) {
    return await this.usersService.findById(req.user.userId);
  }
}
