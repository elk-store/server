import {
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

const DUPLICATED_KEY_VALUE_ERROR = '23505';

@Catch()
export class QueryFailedExceptionFilter extends BaseExceptionFilter {
  public catch(exception: Error, host: ArgumentsHost) {
    if (exception.name === 'QueryFailedError') {
      if ((exception as any).code === DUPLICATED_KEY_VALUE_ERROR) {
        return super.catch(
          new HttpException('Duplicated Key Value', HttpStatus.CONFLICT),
          host
        );
      }
    }

    super.catch(exception, host);
  }
}
