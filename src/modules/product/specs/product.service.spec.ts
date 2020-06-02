/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { Test } from '@nestjs/testing';

import { ProductRepository } from '../product.repository';
import { ProductService } from '../product.service';
import { ProductBuilder } from './product.spec-helper';

const mockProductRepository = () => ({
  persist: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  deleteById: jest.fn(),
});

describe('Product service', () => {
  let productService: ProductService;
  let productRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ProductService,
        { provide: ProductRepository, useFactory: mockProductRepository },
      ],
    }).compile();

    productService = module.get<ProductService>(ProductService);
    productRepository = module.get<ProductRepository>(ProductRepository);
  });

  describe('create', () => {
    it('should create a product', async () => {
      productRepository.persist.mockResolvedValue('product');

      expect(productRepository.persist).not.toHaveBeenCalled();

      expect(await productService.create(ProductBuilder.build())).toBe(
        'product'
      );

      expect(productRepository.persist).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      productRepository.persist.mockResolvedValue('product');

      expect(productRepository.persist).not.toHaveBeenCalled();

      expect(await productService.update(ProductBuilder.build(), 'id')).toBe(
        'product'
      );

      expect(productRepository.persist).toHaveBeenCalledTimes(1);
    });
  });

  describe('findById', () => {
    it('should return a product', async () => {
      productRepository.findById.mockResolvedValue('product');

      expect(productRepository.findById).not.toHaveBeenCalled();

      const result = await productService.findById('id');
      expect(result).toBe('product');
      expect(productRepository.findById).toHaveBeenCalledWith('id');
    });
  });

  describe('findAll', () => {
    it('should return all products', async () => {
      productRepository.findAll.mockResolvedValue('product');

      expect(productRepository.findAll).not.toHaveBeenCalled();

      const result = await productService.findAll();
      expect(result).toBe('product');
    });
  });

  describe('delete', () => {
    it('should delete a product', async () => {
      productRepository.deleteById.mockResolvedValue('product');
      await productService.delete('id');
      expect(productRepository.deleteById).toHaveBeenCalledWith('id');
    });
  });
});
