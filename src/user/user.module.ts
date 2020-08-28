import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { GithubLib } from 'src/lib/github.lib';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  exports: [UserService],
  controllers: [UserController],
  providers: [
    UserService,
    GithubLib
  ],
})
export class UserModule { }
