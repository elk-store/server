import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  UseGuards,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { RequiredRoles } from '../../core/auth/required-roles.decorator';
import { UserRole } from '../user/user.interface';
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

  @UseGuards(AuthGuard())
  @RequiredRoles(UserRole.ADMINISTRATOR)
  @Post()
  create(@Body() productRequest: ProductDTO): Promise<Product> {
    return this.productService.create(productRequest);
  }

  @UseGuards(AuthGuard())
  @RequiredRoles(UserRole.ADMINISTRATOR)
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() productUpdateRequest: ProductDTO
  ): Promise<Product> {
    return this.productService.update(productUpdateRequest, id);
  }

  @UseGuards(AuthGuard())
  @RequiredRoles(UserRole.ADMINISTRATOR)
  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.productService.delete(id);
  }
}
