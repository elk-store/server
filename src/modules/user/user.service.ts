import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';

import { UserDTO } from './user.dto';
import { User } from './user.entity';
import { RulePermission, Status } from './user.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {}

  public async signUp(payload: UserDTO): Promise<User> {
    const user = new User();

    user.email = payload.email;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(payload.password, user.salt);
    user.name = payload.name;
    user.cpf = payload.cpf;
    user.birthdate = payload.birthdate;
    user.phone = payload.phone;
    user.rulePermission = RulePermission.basic;
    user.status = Status.active;

    return this.userRepository.persist(user);
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }
}
