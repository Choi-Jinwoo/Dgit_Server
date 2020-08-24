import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './config';
import { Logger } from '@nestjs/common';
import { CustomValidationPipe } from './pipe/customValidation.pipe';

const port = config.APP.PORT || 8080;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new CustomValidationPipe())
  await app.listen(port);
  Logger.log(`Server is running on ${port}`, 'Bootstrap');
}
bootstrap();
