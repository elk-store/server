import { IsString, IsDateString, MinLength } from 'class-validator';

export class UserDTO {
  @IsString()
  public name: string;

  @IsString()
  public email: string;

  @MinLength(8)
  @IsString()
  public password: string;

  @IsString()
  public cpf: string;

  @IsDateString()
  public birthdate: Date;

  @IsString()
  public phone: string;
}
