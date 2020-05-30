import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Body,
  Put,
} from '@nestjs/common';

import { ProductDTO } from './product.dto';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: string): Promise<Product> {
    return this.productService.findById(id);
  }

  @Post()
  create(@Body() productRequest: ProductDTO): Promise<Product> {
    return this.productService.create(productRequest);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() productUpdateRequest: ProductDTO
  ): Promise<Product> {
    return this.productService.update(productUpdateRequest, id);
  }
}
