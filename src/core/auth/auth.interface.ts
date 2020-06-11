import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginPayload {
  @ApiProperty({ description: 'The email of an user' })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    minimum: 8,
  })
  @MinLength(8)
  @IsString()
  password: string;
}

export class JwtPayload {
  email: string;
}

export class JwtResponse {
  @ApiProperty({ description: 'The Bearer token from the authentication' })
  token: string;
}
