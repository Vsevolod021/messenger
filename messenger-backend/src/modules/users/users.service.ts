import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './users.dto';
import type { Request } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userModel.create(createUserDto);
  }

  async findAll() {
    return await this.userModel.find();
  }

  async findById(id: string) {
    return await this.userModel.findById(id);
  }

  async findByLogin(login: string) {
    return await this.userModel.findOne({ login }).select('+passwordHash');
  }
}
