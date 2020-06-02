import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginPayload {
  @IsEmail()
  email: string;

  @MinLength(8)
  @IsString()
  password: string;
}

export class JwtPayload {
  email: string;
}

export class JwtResponse {
  token: string;
}
