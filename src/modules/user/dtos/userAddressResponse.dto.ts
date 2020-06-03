import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserAddressResponseDTO {
  @ApiProperty({
    description: 'The unique id',
  })
  @Expose()
  readonly id: string;

  @ApiProperty({
    description: 'The given name',
  })
  @Expose()
  readonly name: string;

  @ApiProperty({
    description: 'The street name',
  })
  @Expose()
  readonly street: string;

  @ApiProperty({
    description: 'The address number',
  })
  @Expose()
  readonly number: number;

  @ApiProperty({
    description: 'The district',
  })
  @Expose()
  readonly district: string;

  @ApiProperty({
    description: 'The CEP',
  })
  @Expose()
  readonly cep: number;

  @ApiProperty({
    description: 'The City',
  })
  @Expose()
  readonly city: string;

  @ApiProperty({
    description: 'The state',
  })
  @Expose()
  readonly state: string;
}
