import { Catch, ArgumentsHost, NotFoundException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class EntityNotFoundExceptionFilter extends BaseExceptionFilter {
  public catch(exception: Error, host: ArgumentsHost) {
    if (exception.name === 'EntityNotFound') {
      return super.catch(new NotFoundException(), host);
    }

    super.catch(exception, host);
  }
}
