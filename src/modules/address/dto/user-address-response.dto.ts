import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserAddressResponseDTO {
  @ApiProperty({ description: 'The ID of the address' })
  @Expose()
  public id: string;

  @ApiProperty({ description: 'The name of the address' })
  @Expose()
  public name: string;

  @ApiProperty({ description: 'The street of the address' })
  @Expose()
  public street: string;

  @ApiProperty({ description: 'The street number of the address' })
  @Expose()
  public number: number;

  @ApiProperty({ description: 'The district of the address' })
  @Expose()
  public district: string;

  @ApiProperty({ description: 'The CEP of the address' })
  @Expose()
  public cep: number;

  @ApiProperty({ description: 'The city of the address' })
  @Expose()
  public city: string;

  @ApiProperty({ description: 'The state of the address' })
  @Expose()
  public state: string;
}
