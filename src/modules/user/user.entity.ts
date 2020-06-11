import * as bcrypt from 'bcryptjs';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserAddress } from '../address/user-address.entity';
import { UserPayment } from '../payment/user-payment.entity';
import { Status, UserRole } from './user.interface';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  public salt: string;

  @Column()
  public password: string;

  @Column()
  public name: string;

  @Column({ unique: true })
  public cpf: string;

  @Column()
  public birthdate: Date;

  @Column()
  public phone: string;

  @Column()
  public role: UserRole;

  @Column()
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

  async hasCorrectPassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);

    return hash === this.password;
  }
}
