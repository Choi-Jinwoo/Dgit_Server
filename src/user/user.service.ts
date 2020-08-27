import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { CreateUserDTO } from './model/createUser.dto';
import { GithubLib } from 'src/lib/github.lib';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
    private readonly githubLib: GithubLib,
  ) { }

  async getUser(userID: string): Promise<User | null> {
    const user = await this.userRepository.findOne(userID);
    return user || null;
  }

  async getAllowedUser(): Promise<User[]> {
    const users = await this.userRepository.findByIsAllowed(true);
    return users;
  }

  async getAllowedUserOrderByTotalContributions(): Promise<User[]> {
    const users = await this.userRepository.findByIsAllowedOrderByTotalContributionsDesc(true);
    return users;
  }

  async getGreatestTotalContributionsUser(): Promise<User | null> {
    const user = await this.userRepository.findGreatestTotalContributions();
    return user || null;
  }

  async createUser(createUserDTO: CreateUserDTO): Promise<void> {
    const existUser = await this.githubLib.getGithubUser(createUserDTO.userID);
    if (existUser === null) {
      throw new HttpException({
        message: 'Github에 존재하지 않는 회원',
      }, HttpStatus.NOT_FOUND);
    }

    // DB에 저장된 회원
    const savedUser = await this.getUser(createUserDTO.userID);
    if (savedUser !== null) {
      throw new HttpException({
        message: '이미 존재하는 회원'
      }, HttpStatus.CONFLICT);
    }


    if (!createUserDTO.name) {
      createUserDTO.name = existUser.name || existUser.login;
    }

    const user = this.userRepository.create(createUserDTO);

    const contribution = await this.githubLib.getGithubUserDetailInfoByUser(user.userID);
    user.totalContributions = contribution.user.contributionsCollection.contributionCalendar.totalContributions;

    // 프로필 이미지 설정
    user.userImage = existUser.login;
    user.userImage = existUser.avatar_url;
    user.bio = existUser.bio;

    await this.userRepository.save(user);
  }

  async updateUser(user: User): Promise<void> {
    await this.userRepository.save(user);
  }
}
