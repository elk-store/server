import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { query } from 'express';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { Repository, DeleteResult, SelectQueryBuilder } from 'typeorm';

import { ProductCreateDTO } from './dtos/product-create.dto';
import { ProductSearchDTO } from './dtos/product-search.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) {}

  public create(productRequest: ProductCreateDTO): Promise<Product> {
    const product = plainToClass(Product, productRequest);
    return this.productRepository.save(product);
  }

  public update(
    productRequest: ProductCreateDTO,
    id: string
  ): Promise<Product> {
    const product = plainToClass(Product, productRequest);
    product.id = id;
    return this.productRepository.save(product);
  }

  public delete(id: string): Promise<DeleteResult> {
    return this.productRepository.delete(id);
  }

  public find(productSearch: ProductSearchDTO): Promise<Product> {
    return this.queryBuilder(productSearch).getOne();
  }

  public paginate(
    productSearch: ProductSearchDTO,
    options: IPaginationOptions
  ): Promise<Pagination<Product>> {
    return paginate<Product>(this.queryBuilder(productSearch), options);
  }

  private queryBuilder(
    productSearch: ProductSearchDTO
  ): SelectQueryBuilder<Product> {
    const queryBuilder = this.productRepository.createQueryBuilder('product');
    queryBuilder.where('product.id IS NOT NULL');

    if (productSearch.id !== null && productSearch.id !== undefined) {
      queryBuilder.andWhere('product.id = :id', {
        id: productSearch.id,
      });
    }

    if (productSearch.name !== null && productSearch.name !== undefined) {
      queryBuilder.andWhere('product.name ilike :name', {
        name: '%' + productSearch.name + '%',
      });
    }

    if (
      productSearch.minPrice !== null &&
      productSearch.minPrice !== undefined
    ) {
      queryBuilder.andWhere('product.price >= :minPrice', {
        minPrice: productSearch.minPrice,
      });
    }

    if (
      productSearch.maxPrice !== null &&
      productSearch.maxPrice !== undefined
    ) {
      queryBuilder.andWhere('product.price <= :maxPrice', {
        maxPrice: productSearch.maxPrice,
      });
    }

    if (productSearch.tags !== null && productSearch.tags !== undefined) {
      productSearch.tags.map(tag => {
        queryBuilder.andWhere('product.tags ilike :tags', {
          tags: '%' + tag + '%',
        });
      });
    }

    if (productSearch.sizes !== null && productSearch.sizes !== undefined) {
      productSearch.sizes.map(size => {
        queryBuilder.andWhere('product.sizes ilike :sizes', {
          sizes: '%' + size + '%',
        });
      });
    }

    if (productSearch.orders !== null && productSearch.orders !== undefined) {
      productSearch.orders.forEach(order => {
        if (order.startsWith('-')) {
          order = order.replace('-', '');
          queryBuilder.addOrderBy('product.' + order, 'DESC');
        } else {
          queryBuilder.addOrderBy('product.' + order, 'ASC');
        }
      });
    }

    return queryBuilder;
  }
}
