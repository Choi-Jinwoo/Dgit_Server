import { Injectable, Logger } from '@nestjs/common';
import { scheduleJob, Job } from 'node-schedule';

import { ContributionService } from 'src/contribution/contribution.service';
import { TotalTopService } from 'src/total_top/totalTop.service';
import { WeekTopService } from 'src/week_top/weekTop.service';

@Injectable()
export class ScheduleLib {

  constructor(
    private contributionService: ContributionService,
    private totalTopService: TotalTopService,
    private weekTopService: WeekTopService,
  ) { }

  registerDailySchedule(): Job {
    return scheduleJob('0 0 0 * * 0-5', async () => {
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

  registerWeeklySchedule(): Job {
    return scheduleJob('0 0 0 * * 6', async () => {
      try {
        Logger.log('Weekly 스케쥴 시작', 'registerWeeklySchedule');
        await this.syncGithub();
        await this.syncTotalTop();
        await this.syncWeekTop();
        Logger.log('Weekly 스케쥴 종료', 'registerWeeklySchedule');
      } catch (err) {
        Logger.error(err, 'registerWeeklySchedule');
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
      await this.totalTopService.createTodayTotalTop();
      Logger.log('Total Top 동기화 종료', 'syncTotalTop');
    } catch (err) {
      Logger.error(err, 'syncTotalTop');
    }
  }

  private async syncWeekTop(): Promise<void> {
    try {
      Logger.log('Week Top 동기화 시작', 'syncTotalTop');
      await this.weekTopService.createWeekTop();
      Logger.log('Week Top 동기화 종료', 'syncTotalTop');
    } catch (err) {
      Logger.error(err, 'syncTotalTop');
    }
  }
}