import { NotFoundException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

import { EntityNotFoundExceptionFilter } from '../entity-not-found.exception';

class EntityNotFound extends Error {}

describe('EntityNotFound exception tests', () => {
  const entityNotFoundExceptionFilter = new EntityNotFoundExceptionFilter();
  const catchFn = jest.fn();
  const argumentHost = {};

  jest
    .spyOn(BaseExceptionFilter.prototype, 'catch')
    .mockImplementation(catchFn);

  it('Should catch call super with original error', () => {
    const error = new Error();

    entityNotFoundExceptionFilter.catch(error, argumentHost as any);

    expect(catchFn).toBeCalledWith(error, argumentHost);
  });

  it('Should catch call super with not found error', () => {
    const notFoundError = new EntityNotFound();

    notFoundError.name = 'EntityNotFound';
    entityNotFoundExceptionFilter.catch(notFoundError, argumentHost as any);

    expect(catchFn).toBeCalledWith(expect.any(NotFoundException), argumentHost);
  });
});
