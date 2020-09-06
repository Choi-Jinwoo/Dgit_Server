import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WeekTop } from './weekTop.entity';
import { WeekTopRepository } from './weekTop.repository';
import { ContributionService } from 'src/contribution/contribution.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class WeekTopService {

  constructor(
    @InjectRepository(WeekTop)
    private readonly weekTopRepository: WeekTopRepository,
    private readonly contributionService: ContributionService,
    private readonly userService: UserService,
  ) { }

  async getHistory(): Promise<WeekTop[]> {
    const weekTop = await this.weekTopRepository.findOrderByCreatedAtDesc();

    for (const weekTopItem of weekTop) {
      if (weekTopItem.userID !== undefined && weekTopItem.userID !== null) {
        weekTopItem.user = await this.userService.getUser(weekTopItem.userID);
      }
    }

    return weekTop;
  }

  async createWeekTop(): Promise<void> {
    const yesterday = new Date();
    yesterday.setDate(-1);

    const weekRank = await this.contributionService.getWeekRank(yesterday);
    const weekTopUser = weekRank[0];

    const weekTop = new WeekTop();

    weekTop.user = weekTopUser;
    weekTop.weekContributions = weekTopUser.weekContributions;

    await this.weekTopRepository.save(weekTop);
  }
}