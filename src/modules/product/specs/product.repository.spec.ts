import { Test } from '@nestjs/testing';

import { ProductRepository } from '../product.repository';
import { ProductBuilder } from './product.spec-helper';

describe('ProductRepository', () => {
  let productRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ProductRepository],
    }).compile();

    productRepository = await module.get<ProductRepository>(ProductRepository);
  });

  beforeEach(() => {
    productRepository.persist = jest.fn();
    productRepository.findAll = jest.fn();
    productRepository.findById = jest.fn();
    productRepository.deleteById = jest.fn();
  });

  describe('persist', () => {
    it('should persist a product', async () => {
      productRepository.persist.mockResolvedValue(ProductBuilder);

      await productRepository.persist(ProductBuilder);

      expect(productRepository.persist).toHaveBeenCalledWith(ProductBuilder);
    });
  });

  describe('findById', () => {
    it('should find a product', async () => {
      productRepository.findById.mockResolvedValue(ProductBuilder);

      expect(productRepository.findById).not.toHaveBeenCalled();

      const result = await productRepository.findById('id');

      expect(result).toBe(ProductBuilder);
      expect(productRepository.findById).toHaveBeenCalledWith('id');
    });
  });

  describe('deleteById', () => {
    it('should delete a product', async () => {
      productRepository.deleteById.mockResolvedValue(ProductBuilder);

      expect(productRepository.deleteById).not.toHaveBeenCalled();

      await productRepository.deleteById('id');

      expect(productRepository.deleteById).toHaveBeenCalledWith('id');
    });
  });

  describe('findAll', () => {
    it('should find all products', async () => {
      productRepository.findAll.mockResolvedValue(ProductBuilder);

      expect(productRepository.findAll).not.toHaveBeenCalled();

      const result = await productRepository.findAll();

      expect(result.builder).toBe(ProductBuilder.builder);
    });
  });
});
