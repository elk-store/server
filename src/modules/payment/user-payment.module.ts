import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../../core/auth/auth.module';
import { UserModule } from '../user/user.module';
import { UserPaymentController } from './user-payment.controller';
import { UserPayment } from './user-payment.entity';
import { UserPaymentService } from './user-payment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserPayment]),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserPaymentController],
  providers: [UserPaymentService],
  exports: [UserPaymentService],
})
export class PaymentModule {}
