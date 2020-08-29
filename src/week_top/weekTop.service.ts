import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WeekTop } from './weekTop.entity';
import { WeekTopRepository } from './weekTop.repository';
import { ContributionService } from 'src/contribution/contribution.service';

@Injectable()
export class WeekTopService {

  constructor(
    @InjectRepository(WeekTop)
    private readonly weekTopRepository: WeekTopRepository,
    private readonly contributionService: ContributionService,
  ) { }

  async getHistory(): Promise<WeekTop[]> {
    const weekTop = await this.weekTopRepository.findOrderByCreatedAtDesc();
    return weekTop;
  }

  async createWeekTop(): Promise<void> {
    const weekRank = await this.contributionService.getWeekRank();
    const weekTopUser = weekRank[0];

    const weekTop = new WeekTop();

    weekTop.user = weekTopUser;
    weekTop.weekContributions = weekTopUser.weekContributions;

    await this.weekTopRepository.save(weekTop);
  }
}