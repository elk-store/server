import { ApiProperty } from '@nestjs/swagger';
import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class UserPaymentResponseDTO {
  @ApiProperty({
    description: 'The unique id',
  })
  @Expose()
  readonly id: string;

  @ApiProperty({
    description: 'The given name',
  })
  @Expose()
  readonly name: string;

  @ApiProperty({
    description: 'The card number',
  })
  @Expose()
  readonly cardNumber: number;

  @ApiProperty({
    description: 'The expire date',
  })
  @Expose()
  readonly expireAt: Date;
}
