import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';

import { UserDTO } from './user.dto';
import { User } from './user.entity';
import { RulePermission, Status } from './user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
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

    return this.userRepository.save(user);
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }
}
