import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository, DeleteResult } from 'typeorm';

import { ProductCreateDTO } from './dtos/product-create.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) {}

  public findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  public findById(id: string): Promise<Product> {
    return this.productRepository.findOneOrFail(id);
  }

  public create(productRequest: ProductCreateDTO): Promise<Product> {
    const product = plainToClass(Product, productRequest);
    return this.productRepository.save(product);
  }

  public update(productRequest: ProductCreateDTO, id: string): Promise<Product> {
    const product = plainToClass(Product, productRequest);
    product.id = id;
    return this.productRepository.save(product);
  }

  public delete(id: string): Promise<DeleteResult> {
    return this.productRepository.delete(id);
  }
}
