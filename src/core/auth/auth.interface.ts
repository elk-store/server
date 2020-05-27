import { IsEmail, IsString } from 'class-validator';

export class LoginPayload {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
