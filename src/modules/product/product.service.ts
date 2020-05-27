import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Product } from './product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository
  ) {}

  public async findAll(): Promise<Product[]> {
    return await this.productRepository.findAll();
  }

  public async findById(id: string): Promise<Product> {
    return await this.productRepository.findById(id);
  }
}
