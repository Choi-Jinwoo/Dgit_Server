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

  registerDailySchedule(): Job {
    return scheduleJob('0 0 0 * * *', async () => {
      try {
        Logger.log('Daily 스케쥴 시작', 'registerDailySchedule');
        await this.syncGithub();
        await this.syncTotalTop();
        Logger.log('Daily 스케쥴 종료', 'registerDailySchedule');
      } catch (err) {
        Logger.error(err, 'registerDailySchedule');
      }
    });
  }

  private async syncGithub(): Promise<void> {
    try {
      Logger.log('Github 동기화 시작', 'syncGithub');
      await this.contributionService.initContribution();
      await this.contributionService.syncContribution();
      Logger.log('Github 동기화 종료', 'syncGithub');
    } catch (err) {
      Logger.error(err, 'syncGithub');
    }
  }

  private async syncTotalTop(): Promise<void> {
    try {
      Logger.log('Total Top 동기화 시작', 'syncTotalTop');
      this.totalTopService.createTodayTotalTop();
      Logger.log('Total Top 동기화 종료', 'syncTotalTop');
    } catch (err) {
      Logger.error(err, 'syncTotalTop');
    }
  }
}