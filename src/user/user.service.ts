import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { CreateUserDTO } from './model/createUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository
  ) { }

  async getUser(userID: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne(userID);
    return user;
  }

  async getAllowedUser(): Promise<User[]> {
    const users = await this.userRepository.findByIsAllowed(true);
    return users;
  }

  async createUser(createUserDTO: CreateUserDTO): Promise<void> {
    const existUser = await this.getUser(createUserDTO.userID);
    if (existUser !== undefined) {
      throw new HttpException({
        message: '이미 존재하는 회원'
      }, HttpStatus.CONFLICT);
    }

    const user = this.userRepository.create(createUserDTO);
    await this.userRepository.save(user);
  }
}
