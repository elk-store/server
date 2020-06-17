import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString } from 'class-validator';

export class UserPaymentCreateDTO {
  public userEmail: string;

  @ApiProperty({
    description: 'The custom name of the payment credit card',
    required: true,
  })
  @IsString()
  public name: string;

  @ApiProperty({ description: 'The card number', required: true })
  @IsString()
  public cardNumber: string;

  @ApiProperty({ description: 'The card expire date', required: true })
  @IsDateString()
  public expireAt: Date;
}
