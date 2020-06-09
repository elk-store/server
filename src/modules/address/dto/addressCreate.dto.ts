import { IsString, IsNumber, IsEmail } from 'class-validator';

export class AddressCreateDTO {
  @IsString()
  @IsEmail()
  public userEmail: string;

  @IsString()
  public name: string;

  @IsString()
  public street: string;

  @IsNumber()
  public number: number;

  @IsString()
  public district: string;

  @IsNumber()
  public cep: number;

  @IsString()
  public city: string;

  @IsString()
  public state: string;
}
