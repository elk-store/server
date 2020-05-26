import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { User } from '../user/user.entity';

@Entity()
export class UserAddress {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column()
  public street: string;

  @Column()
  public number: number;

  @Column()
  public district: string;

  @Column()
  public cep: number;

  @Column()
  public city: string;

  @Column()
  public state: string;

  @ManyToOne(
    () => User,
    user => user.userAddress
  )
  public user: User;
}
