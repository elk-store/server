import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class UserAddressCreateDTO {
  public userEmail: string;

  @ApiProperty({ description: 'The name of the address' })
  @IsString()
  public name: string;

  @ApiProperty({ description: 'The street name of the address' })
  @IsString()
  public street: string;

  @ApiProperty({ description: 'The street number of the address' })
  @IsNumber()
  public number: number;

  @ApiProperty({ description: 'The district of the address' })
  @IsString()
  public district: string;

  @ApiProperty({ description: 'The CEP of the address' })
  @IsNumber()
  public cep: number;

  @ApiProperty({ description: 'The city of the address' })
  @IsString()
  public city: string;

  @ApiProperty({ description: 'The state of the address' })
  @IsString()
  public state: string;
}
