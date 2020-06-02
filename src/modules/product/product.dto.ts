import { IsString, IsNumber, IsEnum, IsDefined } from 'class-validator';

import { Size } from './product.interface';

export class ProductDTO {
  @IsString()
  public name: string;

  @IsNumber()
  public price: number;

  @IsNumber()
  public quantity: number;

  @IsString()
  public description: string;

  @IsDefined()
  public tags: Set<string>;

  @IsDefined()
  public pictures: Set<string>;

  @IsEnum(Size, { each: true })
  public size: Set<number>;
}
