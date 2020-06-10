import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, MinLength } from 'class-validator';

export class UserCreateDTO {
  @ApiProperty({
    description: 'The personal name of the user',
    required: true,
  })
  @IsString()
  public name: string;

  @ApiProperty({
    description: 'The email',
    required: true,
  })
  @IsString()
  public email: string;

  @ApiProperty({
    description: 'A secure password',
    required: true,
  })
  @MinLength(8)
  @IsString()
  public password: string;

  @ApiProperty({
    description: 'The CPF of the user',
    required: true,
  })
  @IsString()
  public cpf: string;

  @ApiProperty({
    description: 'The birthdate',
    required: true,
  })
  @IsDateString()
  public birthdate: Date;

  @ApiProperty({
    description: 'The phone number',
    required: true,
  })
  @IsString()
  public phone: string;
}
