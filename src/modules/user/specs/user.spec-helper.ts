import { makeFactory } from 'factory.ts';

import { UserCreateDTO } from '../dtos/userCreate.dto';

export const UserBuilder = makeFactory<UserCreateDTO>({
  birthdate: new Date(Date.UTC(2000, 1, 1)),
  cpf: '000.000.000-00',
  email: 'john@doe.com',
  name: 'John Doe',
  password: 'foo123bar',
  phone: '+00 00 00000-0000',
});
