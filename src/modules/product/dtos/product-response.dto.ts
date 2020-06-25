import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

import { Size } from '../product.interface';

@Exclude()
export class ProductResponseDTO {
  @ApiProperty({
    description: 'The product unique id',
  })
  @Expose()
  readonly id: string;

  @ApiProperty({
    description: 'The product name',
  })
  @Expose()
  readonly name: string;

  @ApiProperty({
    description: 'The product price',
  })
  @Expose()
  readonly price: number;

  @ApiProperty({
    description: 'The available quantity of the product',
  })
  @Expose()
  readonly quantity: number;

  @ApiProperty({
    description: 'The product description',
  })
  @Expose()
  readonly description: string;

  @ApiProperty({
    description: 'The product tags',
  })
  @Expose()
  readonly tags: string[];

  @ApiProperty({
    description: "The product's pictures (Links)",
  })
  @Expose()
  readonly pictures: string[];

  @ApiProperty({
    description: "The product's available sizes",
    enum: Size,
  })
  @Expose()
  readonly sizes: number[];

  @ApiProperty({
    description: 'The product created date',
  })
  @Expose()
  readonly createdAt: Date;

  @ApiProperty({
    description: 'The product last update date',
  })
  @Expose()
  readonly updatedAt: Date;
}
