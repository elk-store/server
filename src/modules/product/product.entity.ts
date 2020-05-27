import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

import { Size } from './product.interface';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column()
  public price: number;

  @Column()
  public quantity: number;

  @Column()
  public description: string;

  @Column('simple-array')
  public tags: string[];

  @Column('simple-array')
  public pictures: string[];

  @Column('enum', { enum: Size })
  public size: Size;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
