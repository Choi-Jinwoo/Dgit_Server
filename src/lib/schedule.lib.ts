import { Injectable, Logger } from '@nestjs/common';
import { scheduleJob, Job } from 'node-schedule';

import { ContributionService } from 'src/contribution/contribution.service';
import { TotalTopService } from 'src/total_top/totalTop.service';

@Injectable()
export class ScheduleLib {

  constructor(
    private contributionService: ContributionService,
    private totalTopService: TotalTopService,
  ) { }

  registerSyncGithubSchedule(): Job {
    return scheduleJob('1 * * * * *', async () => {
      try {
        Logger.log('Github 동기화 시작', 'registerSyncGithubSchedule');
        await this.contributionService.initContribution();
        await this.contributionService.syncContribution();
        Logger.log('Github 동기화 종료', 'registerSyncGithubSchedule');
      } catch (err) {
        Logger.error(err, 'registerSyncGithubSchedule');
      }
    });
  }

  registerSyncTotalTop(): Job {
    return scheduleJob('1 * * * * *', async () => {
      try {
        Logger.log('Total Top 동기화 시작', 'registerSyncTotalTop');
        this.totalTopService.createTodayTotalTop();
        Logger.log('Total Top 동기화 종료', 'registerSyncTotalTop');
      } catch (err) {
        Logger.error(err, 'registerSyncTotalTop');
      }
    });
  }
}