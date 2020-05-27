import { Repository, EntityRepository } from 'typeorm';

import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public async persist(user: User): Promise<User> {
    return await this.save(user);
  }

  public async findByEmail(email: string): Promise<User> {
    return await this.findOneOrFail({ email });
  }

  public async findById(id: string): Promise<User> {
    return await this.findOneOrFail(id);
  }
}
