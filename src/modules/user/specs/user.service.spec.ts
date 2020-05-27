/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';

import { ConfigModuleTest } from '../../../../test/helpers/config';
import { User } from '../user.entity';
import { UserModule } from '../user.module';
import { UserService } from '../user.service';
import { UserBuilder } from './user.spec-helper';

describe('User controller tests', () => {
  let userService: UserService;
  const repository = {
    save: jest.fn().mockResolvedValue('User saved!'),
  };

  beforeEach(async () => {
    // @ts-ignore
    bcrypt.genSalt = jest.fn();

    const module = await Test.createTestingModule({
      imports: [ConfigModuleTest, UserModule],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue(repository)
      .compile();

    userService = module.get(UserService);
  });

  it('Should sign up method call save from repository', async () => {
    // @ts-ignore
    bcrypt.genSalt.mockReturnValue('$2a$10$0kQu/4H4DIKAwfLySk0Sfe');

    const userData = UserBuilder.build();
    const savedUser = await userService.signUp(userData);

    expect(savedUser).toEqual('User saved!');
    expect(repository.save).toBeCalledWith(
      Object.assign(userData, {
        rulePermission: 0,
        status: 1,
        salt: '$2a$10$0kQu/4H4DIKAwfLySk0Sfe',
        password:
          '$2a$10$0kQu/4H4DIKAwfLySk0SfeK1uTSFFErjOf4duxReQ3RsZUnIyi.0S',
      })
    );
  });
});
