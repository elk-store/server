import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum, IsDefined } from 'class-validator';

import { Size } from '../product.interface';

export class ProductCreateDTO {
  @ApiProperty({
    description: 'The product name',
    required: true,
  })
  @IsString()
  public name: string;

  @ApiProperty({
    description: 'The product price',
    required: true,
  })
  @IsNumber()
  public price: number;

  @ApiProperty({
    description: "The product's available quantity",
    required: true,
  })
  @IsNumber()
  public quantity: number;

  @ApiProperty({
    description: 'The product description',
    required: true,
  })
  @IsString()
  public description: string;

  @ApiProperty({
    description: "The product's tags",
    required: false,
  })
  @IsDefined()
  public tags: Set<string>;

  @ApiProperty({
    description: "The product's pictures (Links)",
    required: true,
  })
  @IsDefined()
  public pictures: Set<string>;

  @ApiProperty({
    description: "The product's sizes",
    enum: Size,
    required: true,
  })
  @IsEnum(Size, { each: true })
  public size: Set<string>;
}
