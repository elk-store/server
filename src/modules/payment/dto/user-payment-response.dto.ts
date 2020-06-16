import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserPaymentResponseDTO {
  @ApiProperty({ description: 'The unique ID of the payment credit card' })
  @Expose()
  public id: string;

  @ApiProperty({ description: 'The given name of the credit card' })
  @Expose()
  public name: string;

  @ApiProperty({ description: 'The credit card number' })
  @Expose()
  public cardNumber: number;

  @ApiProperty({ description: 'The expire date of the credit card' })
  @Expose()
  public expireAt: Date;
}
