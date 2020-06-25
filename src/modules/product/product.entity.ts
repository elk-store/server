import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column('decimal')
  public price: number;

  @Column()
  public quantity: number;

  @Column()
  public description: string;

  @Column('simple-array')
  public tags: string[];

  @Column('simple-array')
  public pictures: string[];

  @Column('simple-array')
  public sizes: string[];

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
