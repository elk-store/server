import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserPayment } from './user-payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserPayment])],
})
export class PaymentModule {}
