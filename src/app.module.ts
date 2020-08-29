import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ContributionModule } from './contribution/contribution.module';
import { ScheduleLib } from './lib/schedule.lib';
import { TotalTopModule } from './total_top/totalTop.module';
import { WeekTopModule } from './week_top/weekTop.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    ContributionModule,
    TotalTopModule,
    WeekTopModule,
  ],
  controllers: [AppController],
  providers: [AppService, ScheduleLib],
})
export class AppModule { }
