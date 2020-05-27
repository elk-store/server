import { IsString, IsDateString } from 'class-validator';

export class UserDTO {
  @IsString()
  public name: string;

  @IsString()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public cpf: string;

  @IsDateString()
  public birthdate: Date;

  @IsString()
  public phone: string;
}
