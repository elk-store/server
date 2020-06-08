import { makeFactory } from 'factory.ts';

import { ProductDTO } from '../product.dto';
import { Size } from '../product.interface';

export const ProductBuilder = makeFactory<ProductDTO>({
  name: 'Laptop Backpack',
  price: 25.75,
  quantity: 23,
  description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
  tags: new Set(['Black', 'Summer']),
  pictures: new Set([
    'https://via.placeholder.com/300',
    'https://via.placeholder.com/350',
  ]),
  size: new Set([Size.XS, Size.S, Size.M]),
});
