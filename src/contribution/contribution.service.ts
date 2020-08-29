import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Contribution } from './contribution.entity';
import { ContributionRepository } from './contribution.repository';
import { UserService } from 'src/user/user.service';
import { GithubLib } from 'src/lib/github.lib';
import { IGithubContribution } from 'src/interface/github/githubUser.interface';
import { User } from 'src/user/user.entity';
import { getWeekSunday, getWeekSaturday } from 'src/lib/util/date.util';
import { IWeekContributionUser } from 'src/interface/github/IWeekContributionUser';

@Injectable()
export class ContributionService {

  constructor(
    @InjectRepository(Contribution)
    private readonly contributionRepository: ContributionRepository,
    private readonly userService: UserService,
    private readonly githubLib: GithubLib,
  ) { }

  async getTotalRank(): Promise<User[]> {
    const rankedUsers = await this.userService.getAllowedUserOrderByTotalContributions();
    return rankedUsers;
  }

  async getWeekRank(): Promise<IWeekContributionUser[]> {
    const users = await this.userService.getAllowedUser();
    const today = new Date();
    const sundayDate = getWeekSunday(today);
    const saturdayDate = getWeekSaturday(today);

    const usersContribution: IWeekContributionUser[] = [];

    for (const user of users) {
      const userContributions = await this.contributionRepository.
        findByUserAndStartDateAndEndDate(user.userID, sundayDate, saturdayDate);

      let weekContributionCount = 0;

      userContributions.forEach((userContribution) => {
        weekContributionCount += userContribution.contributionCount;
      });

      usersContribution.push({
        weekContributions: weekContributionCount,
        ...user,
      });
    }

    usersContribution.sort((userA, userB) => {
      return userB.weekContributions - userA.weekContributions;
    });

    return usersContribution;
  }

  async initContribution(): Promise<void> {
    await this.contributionRepository.deleteAll();
  }

  async syncContribution(): Promise<void> {
    const users = await this.userService.getAllowedUser();

    const contributions: Array<IGithubContribution | null> = await Promise.all(users.map((user) =>
      this.githubLib.getContributionByUser(user.userID)));

    // 총 기여수(total contribution) 업데이트
    await Promise.all(contributions.map((contribution) => {
      if (contribution !== null) {
        const user = users.find((user) => user.userID === contribution.user.login);
        if (user !== undefined) {
          user.totalContributions = contribution.user.contributionsCollection.contributionCalendar.totalContributions;
          user.userImage = contribution.user.avatarUrl;
          user.bio = contribution.user.bio;
          return this.userService.updateUser(user);
        }
      }
    }));

    // 기여수(contribution) 테이블 업데이트
    await Promise.all(contributions.map((contribution) => {
      if (contribution !== null) {
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
      }
    }));
  }
}
