import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Contribution } from './contribution.entity';
import { ContributionRepository } from './contribution.repository';
import { UserService } from 'src/user/user.service';
import { GithubLib } from 'src/lib/github.lib';
import { IGithubContribution } from 'src/interface/github/githubUser.interface';

@Injectable()
export class ContributionService {

  constructor(
    @InjectRepository(Contribution)
    private readonly contributionRepository: ContributionRepository,
    private readonly userService: UserService,
    private readonly githubLib: GithubLib,
  ) { }

  async initContribution(): Promise<void> {
    await this.contributionRepository.deleteAll();
  }

  async syncContribution(): Promise<void> {
    const users = await this.userService.getAllowedUser();

    const contributions: IGithubContribution[] = await Promise.all(users.map((user) =>
      this.githubLib.getContributionByUser(user.userID)));

    // 총 기여수(total contribution) 업데이트
    await Promise.all(contributions.map((contribution) => {
      const user = users.find((user) => user.userID === contribution.user.login);
      if (user !== undefined) {
        user.totalContribution = contribution.user.contributionsCollection.contributionCalendar.totalContributions;
        return this.userService.updateUser(user);
      }
    }));

    // 기여수(contribution) 테이블 업데이트
    await Promise.all(contributions.map((contribution) => {
      const userID = contribution.user.login;

      return contribution.user.contributionsCollection.contributionCalendar.weeks.map((week) =>
        week.contributionDays.map((contributionDay) => {
          const user = users.find((user) => user.userID === userID);

          if (user !== undefined) {
            const contribution = this.contributionRepository.create(contributionDay);
            contribution.user = user;
            return this.contributionRepository.save(contribution);
          }
        })
      )
    }));
  }
}
