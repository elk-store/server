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
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { isEmpty } from 'class-validator';
import { Pagination } from 'nestjs-typeorm-paginate';
import { DeleteResult } from 'typeorm';

import { RequiredRoles } from '../../core/auth/required-roles.decorator';
import { UserRole } from '../user/user.interface';
import { ProductCreateDTO } from './dtos/product-create.dto';
import { ProductResponseDTO } from './dtos/product-response.dto';
import { ProductSearchDTO } from './dtos/product-search.dto';
import { Product } from './product.entity';
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
  @ApiQuery({
    name: 'name',
    description: 'Filter by product name',
    required: false,
  })
  @ApiQuery({
    name: 'max-price',
    description: 'Filter by a max price',
    required: false,
  })
  @ApiQuery({
    name: 'min-price',
    description: 'Filter by a min price',
    required: false,
  })
  @ApiQuery({ name: 'tags', description: 'Filter by tags', required: false })
  @ApiQuery({ name: 'sizes', description: 'Filter by sizes', required: false })
  @ApiQuery({ name: 'order', description: 'Ordination', required: false })
  @ApiQuery({ name: 'page', description: 'Page start number', required: false })
  @ApiQuery({
    name: 'limit',
    description: 'Page limit number',
    required: false,
  })
  @Get()
  public async findAll(
    @Query('name') name: string,
    @Query('max-price') maxPrice = null,
    @Query('min-price') minPrice = null,
    @Query('tags') tags: string = null,
    @Query('sizes') sizes: string = null,
    @Query('order') order: string = null,
    @Query('page') page = 1,
    @Query('limit') limit = 10
  ): Promise<Pagination<ProductResponseDTO>> {
    const searchDto = new ProductSearchDTO();
    searchDto.name = name;
    searchDto.maxPrice = maxPrice;
    searchDto.minPrice = minPrice;

    if (!isEmpty(sizes)) {
      sizes = sizes.replace(' ', '');
      searchDto.sizes = sizes.split(',');
    }

    if (!isEmpty(tags)) {
      tags = tags.replace(' ', '');
      searchDto.tags = tags.split(',');
    }

    if (!isEmpty(order)) {
      order = order.replace(' ', '');
      searchDto.orders = order.split(',');
    }

    const results = await this.productService.paginate(searchDto, {
      page,
      limit,
      route: '/products',
    });

    return new Pagination(
      await Promise.all(
        results.items.map(async (item: Product) => {
          return plainToClass(ProductResponseDTO, item);
        })
      ),
      results.meta,
      results.links
    );
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
    const productSearch = new ProductSearchDTO();
    productSearch.id = id;

    const product = await this.productService.find(productSearch);
    return plainToClass(ProductResponseDTO, product);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({
    status: 201,
    type: ProductResponseDTO,
  })
  @ApiBody({ type: ProductCreateDTO })
  @UseGuards(AuthGuard())
  @RequiredRoles(UserRole.ADMINISTRATOR)
  @Post()
  public async create(
    @Body() productRequest: ProductCreateDTO
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
  @ApiBody({ type: ProductCreateDTO })
  @UseGuards(AuthGuard())
  @RequiredRoles(UserRole.ADMINISTRATOR)
  @Put(':id')
  public async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() productUpdateRequest: ProductCreateDTO
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
  public delete(@Param('id', ParseUUIDPipe) id: string): Promise<DeleteResult> {
    return this.productService.delete(id);
  }
}
