import { ApiProperty } from '@nestjs/swagger';
import { Expose, Exclude, Type } from 'class-transformer';

import { UserRole, Status } from '../user.interface';
import { UserAddressResponseDTO } from './userAddressResponse.dto';
import { UserPaymentResponseDTO } from './userPaymentResponse.dto';

@Exclude()
export class UserResponseDTO {
  @ApiProperty({
    description: 'The unique id',
  })
  @Expose()
  readonly id: string;

  @ApiProperty({
    description: 'The email',
  })
  @Expose()
  readonly email: string;

  @ApiProperty({
    description: 'The personal name',
  })
  @Expose()
  readonly name: string;

  @ApiProperty({
    description: 'The CPF',
  })
  @Expose()
  readonly cpf: string;

  @ApiProperty({
    description: 'The birthdate',
  })
  @Expose()
  readonly birthdate: Date;

  @ApiProperty({
    description: 'The phone number',
  })
  @Expose()
  readonly phone: string;

  @ApiProperty({
    description: 'The user role',
    enum: UserRole,
  })
  @Expose()
  readonly role: UserRole;

  @ApiProperty({
    description: 'The current status',
    enum: Status,
  })
  @Expose()
  readonly status: Status;

  @ApiProperty({
    description: 'The user adresses',
    type: UserAddressResponseDTO,
  })
  @Type(() => UserAddressResponseDTO)
  @Expose()
  readonly userAddress: UserAddressResponseDTO[];

  @ApiProperty({
    description: 'The user payments methods',
    type: UserPaymentResponseDTO,
  })
  @Type(() => UserPaymentResponseDTO)
  @Expose()
  readonly userPayment: UserPaymentResponseDTO[];

  @ApiProperty({
    description: 'Creation date',
  })
  @Expose()
  readonly createdAt: Date;

  @ApiProperty({
    description: 'Update date',
  })
  @Expose()
  readonly updatedAt: Date;
}
