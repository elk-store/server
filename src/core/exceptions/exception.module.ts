import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { EntityNotFoundExceptionFilter } from './entity-not-found.exception';
import { QueryFailedExceptionFilter } from './query-failed.exception';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: EntityNotFoundExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: QueryFailedExceptionFilter,
    },
  ],
})
export class ExceptionModule {}
