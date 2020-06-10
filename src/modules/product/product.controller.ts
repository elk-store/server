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
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
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

  @ApiOperation({ summary: 'List all products' })
  @ApiResponse({
    status: 200,
    type: ProductResponseDTO,
  })
  @Get()
  public async findAll(): Promise<ProductResponseDTO[]> {
    const allProducts = await this.productService.findAll();
    return allProducts.map(product => {
      return plainToClass(ProductResponseDTO, product);
    });
  }

  @ApiOperation({ summary: 'List information of a specific product' })
  @ApiResponse({
    status: 200,
    type: ProductResponseDTO,
  })
  @ApiParam({ name: 'id', description: 'Product id', required: true })
  @Get(':id')
  public async findById(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ProductResponseDTO> {
    const product = this.productService.findById(id);
    return plainToClass(ProductResponseDTO, product);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({
    status: 201,
    type: ProductResponseDTO,
  })
  @ApiBody({ type: ProductDTO })
  @UseGuards(AuthGuard())
  @RequiredRoles(UserRole.ADMINISTRATOR)
  @Post()
  public async create(
    @Body() productRequest: ProductDTO
  ): Promise<ProductResponseDTO> {
    const product = await this.productService.create(productRequest);
    return plainToClass(ProductResponseDTO, product);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a product information' })
  @ApiResponse({
    status: 200,
    type: ProductResponseDTO,
  })
  @ApiParam({
    name: 'id',
    description: 'Product id',
    required: true,
  })
  @ApiBody({ type: ProductDTO })
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

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a specific product' })
  @ApiResponse({
    status: 204,
  })
  @ApiParam({
    name: 'id',
    description: 'Product id',
    required: true,
  })
  @UseGuards(AuthGuard())
  @RequiredRoles(UserRole.ADMINISTRATOR)
  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string): Promise<DeleteResult> {
    return this.productService.delete(id);
  }
}
