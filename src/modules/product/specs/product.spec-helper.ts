import { makeFactory } from 'factory.ts';

import { ProductDTO } from '../product.dto';

export const ProductBuilder = makeFactory<ProductDTO>({
  name: 'lasdfjaksj',
  price: 22,
  quantity: 23,
  description: 'lsafjkjfj',
  tags: new Set(['lasdfk', 'ladkjsf']),
  pictures: new Set(['lasdfk', 'ladkjsf']),
  size: new Set([1, 2, 3]),
});
