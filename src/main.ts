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

  await app.listen(port);

  const scheduleLib = app.get(ScheduleLib);
  app.enableCors({
    origin: "true",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Accept",
  });

  /**
   * 1일 1회 실행(daily event)
   */
  const dailyJob = scheduleLib.registerDailySchedule();

  Logger.log(`Server is running on ${port}`, 'Bootstrap');
}

bootstrap();
