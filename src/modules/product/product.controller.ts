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
import { plainToClass } from 'class-transformer';
import { DeleteResult } from 'typeorm';

import { RequiredRoles } from '../../core/auth/required-roles.decorator';
import { UserRole } from '../user/user.interface';
import { ProductResponseDTO } from './dtos/product-response.dto';
import { ProductDTO } from './product.dto';
import { ProductService } from './product.service';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  public async findAll(): Promise<ProductResponseDTO[]> {
    const allProducts = await this.productService.findAll();
    return allProducts.map(product => {
      return plainToClass(ProductResponseDTO, product);
    });
  }

  @Get(':id')
  public async findById(@Param('id', ParseUUIDPipe) id: string): Promise<ProductResponseDTO> {
    const product = this.productService.findById(id);
    return plainToClass(ProductResponseDTO, product);
  }

  @UseGuards(AuthGuard())
  @RequiredRoles(UserRole.ADMINISTRATOR)
  @Post()
  public async create(@Body() productRequest: ProductDTO): Promise<ProductResponseDTO> {
    const product = await this.productService.create(productRequest);
    return plainToClass(ProductResponseDTO, product);
  }

  @UseGuards(AuthGuard())
  @RequiredRoles(UserRole.ADMINISTRATOR)
  @Put(':id')
  public async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() productUpdateRequest: ProductDTO
  ): Promise<ProductResponseDTO> {
    const product = await this.productService.update(productUpdateRequest, id);
    return plainToClass(ProductResponseDTO, product);
  }

  @UseGuards(AuthGuard())
  @RequiredRoles(UserRole.ADMINISTRATOR)
  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string): Promise<DeleteResult> {
    return this.productService.delete(id);
  }
}
