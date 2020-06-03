import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';

import { UserCreateDTO } from './dtos/userCreate.dto';
import { User } from './user.entity';
import { UserRole, Status } from './user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  public async signUp(payload: UserCreateDTO): Promise<User> {
    const user = new User();

    user.email = payload.email;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(payload.password, user.salt);
    user.name = payload.name;
    user.cpf = payload.cpf;
    user.birthdate = payload.birthdate;
    user.phone = payload.phone;
    user.role = UserRole.REGULAR;
    user.status = Status.ACTIVE;

    return this.userRepository.save(user);
  }

  public findByEmail(email: string): Promise<User> {
    return this.userRepository.findOneOrFail({ email });
  }

  public findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  private hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
