import { Injectable, Logger } from '@nestjs/common';
import { scheduleJob, Job } from 'node-schedule';

import { ContributionService } from 'src/contribution/contribution.service';

@Injectable()
export class ScheduleLib {

  constructor(
    private contributionService: ContributionService,
  ) { }

  registerSyncGithubSchedule(): Job {
    return scheduleJob('1 * * * * *', async () => {
      try {
        Logger.log('Github 동기화 시작', 'registerSyncGithubSchedule');
        await this.contributionService.initContribution();
        await this.contributionService.syncContribution();
        Logger.log('Github 동기화 종료', 'registerSyncGithubSchedule');
      } catch (err) {

      }
    });
  }

}