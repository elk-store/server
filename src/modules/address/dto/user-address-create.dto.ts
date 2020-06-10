import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEmail } from 'class-validator';

export class UserAddressCreateDTO {
  @ApiProperty({
    description: 'The e-mail of the associated user',
    required: true,
  })
  @IsString()
  @IsEmail()
  public userEmail: string;

  @ApiProperty({ description: "The name of the address" })
  @IsString()
  public name: string;

  @ApiProperty({ description: "The street name" })
  @IsString()
  public street: string;

  @ApiProperty({ description: "The street number" })
  @IsNumber()
  public number: number;

  @ApiProperty({ description: "The district of the address" })
  @IsString()
  public district: string;

  @ApiProperty({ description: "The CEP"})
  @IsNumber()
  public cep: number;

  @ApiProperty({ description: "The city" })
  @IsString()
  public city: string;

  @ApiProperty({ description: "The state" })
  @IsString()
  public state: string;
}
