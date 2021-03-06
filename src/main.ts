/* eslint-disable @typescript-eslint/no-unused-vars */
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import { AppModule } from './app.module';
import config from './config';
import { CustomValidationPipe } from './pipe/customValidation.pipe';
import { ScheduleLib } from './lib/schedule.lib';

const port = config.APP.PORT || 8080;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new CustomValidationPipe())
  app.enableCors({
    origin: "*",
  });

  await app.listen(port);

  const scheduleLib = app.get(ScheduleLib);

  // 스케쥴
  const noonJob = scheduleLib.registerHourSchedule();
  const dailyJob = scheduleLib.registerDailySchedule();
  const weeklyJob = scheduleLib.registerWeeklySchedule();

  Logger.log(`Server is running on ${port}`, 'Bootstrap');
}

bootstrap();
