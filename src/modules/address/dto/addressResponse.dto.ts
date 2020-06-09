import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class AddressResponseDTO {
  @Expose()
  public id: string;

  @Expose()
  public name: string;

  @Expose()
  public street: string;

  @Expose()
  public number: number;

  @Expose()
  public district: string;

  @Expose()
  public cep: number;

  @Expose()
  public city: string;

  @Expose()
  public state: string;
}
