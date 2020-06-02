import { HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

import { QueryFailedExceptionFilter } from '../query-failed.exception';

class QueryFailedError extends Error {
  public code;
}

describe('QueryFailedError exception tests', () => {
  const queryFailedExceptionFilter = new QueryFailedExceptionFilter();
  const catchFn = jest.fn();
  const argumentHost = {};

  jest
    .spyOn(BaseExceptionFilter.prototype, 'catch')
    .mockImplementation(catchFn);

  it('Should catch call super with original error', () => {
    const error = new Error();

    queryFailedExceptionFilter.catch(error, argumentHost as any);

    expect(catchFn).toBeCalledWith(error, argumentHost);
  });

  it('Should catch call super with query failed error', () => {
    const queryFailedError = new QueryFailedError();

    queryFailedError.name = 'QueryFailedError';
    queryFailedError.code = '23505';
    queryFailedExceptionFilter.catch(queryFailedError, argumentHost as any);

    expect(catchFn).toBeCalledWith(expect.any(HttpException), argumentHost);
  });
});
