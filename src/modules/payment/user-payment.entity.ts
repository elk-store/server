import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { User } from '../user/user.entity';

@Entity()
export class UserPayment {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column()
  public cardNumber: number;

  @Column()
  public expireDate: Date;

  @ManyToOne(
    () => User,
    user => user.userPayment
  )
  public user: User;
}
