import { Repository, Entity, EntityRepository } from 'typeorm';

import { Product } from './product.entity';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  public async findProducts(): Promise<Product[]> {
    return await this.find();
  }

  public async findById(id: string): Promise<Product> {
    return await this.findOneOrFail(id);
  }
}
