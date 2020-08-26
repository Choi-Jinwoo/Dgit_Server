import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TotalTop } from './totalTop.entity';
import { TotalTopRepository } from './totalTop.repository';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';

@Injectable()
export class TotalTopService {

  constructor(
    @InjectRepository(TotalTop)
    private readonly totalTopRepository: TotalTopRepository,
    private readonly userService: UserService,
  ) { }

  async createTodayTotalTop(): Promise<void> {
    const topUser = await this.userService.getGreatestTotalContributionsUser();
    if (topUser !== null) {
      await this.totalTopRepository.save({
        user: topUser,
        date: new Date(),
      });
    }
  }

  async getCurrentTotalTop(): Promise<User | null> {
    const totalTop = await this.totalTopRepository.findLatest();
    if (totalTop !== undefined) {
      if (totalTop.userID === null) {
        return null;
      }

      const user = await this.userService.getUser(totalTop.userID);
      if (user === null) {
        return null;
      }

      return user;
    }
    return null;
  }

  async getTotalTopStreak(): Promise<number> {
    const entireTotalTop = await this.totalTopRepository.findAllOrderByDateDesc();
    const currentTotalTop = await this.userService.getGreatestTotalContributionsUser();

    if (currentTotalTop === null) {
      return 0;
    }

    let streak = 0;

    for (const totalTop of entireTotalTop) {
      if (totalTop.userID === undefined || totalTop.userID !== currentTotalTop.userID) {
        break;
      }
      streak += 1;
    }

    return streak;
  }
}