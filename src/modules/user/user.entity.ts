import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { UserAddress } from '../address/user-address.entity';
import { UserPayment } from '../payment/user-payment.entity';
import { RulePermission, Status } from './user.interface';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column()
  public email: string;

  @Column()
  public password: string;

  @Column()
  public cpf: string;

  @Column()
  public birthdate: Date;

  @Column()
  public phone: number;

  @Column('enum', { enum: RulePermission })
  public rulePermission: RulePermission;

  @Column('enum', { enum: Status })
  public status: Status;

  @OneToMany(
    () => UserAddress,
    userAddress => userAddress.user
  )
  public userAddress: UserAddress[];

  @OneToMany(
    () => UserPayment,
    userPayment => userPayment.user
  )
  public userPayment: UserPayment[];

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
