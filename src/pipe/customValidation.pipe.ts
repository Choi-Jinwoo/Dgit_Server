import { ValidationPipe, ArgumentMetadata, HttpException, HttpStatus, Logger } from '@nestjs/common';

export class CustomValidationPipe extends ValidationPipe {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    try {
      return await super.transform(value, metadata);
    } catch (err) {
      Logger.debug(err, '검증 오류');
      throw new HttpException({
        message: '검증 오류',
      }, HttpStatus.BAD_REQUEST);
    }
  }
}