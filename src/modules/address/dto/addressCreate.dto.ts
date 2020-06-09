import { IsString, IsNumber, MinLength } from 'class-validator';

export class AddressCreateDTO {
  @IsString()
  public name: string;

  @IsString()
  public street: string;

  @IsNumber()
  public number: number;

  @IsString()
  public district: string;

  @IsNumber()
  @MinLength(8)
  public cep: number;

  @IsString()
  public city: string;

  @IsString()
  public state: string;
}
