import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';

import { ProductDTO } from './product.dto';
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

  public async create(productRequest: ProductDTO): Promise<Product> {
    const product = plainToClass(Product, productRequest);
    return await this.productRepository.persist(product);
  }

  public async update(
    productRequest: ProductDTO,
    id: string
  ): Promise<Product> {
    const product = plainToClass(Product, productRequest);
    product.id = id;
    return await this.productRepository.persist(product);
  }

  public async delete(id: string): Promise<string> {
    return await this.productRepository.deleteById(id);
  }
}
