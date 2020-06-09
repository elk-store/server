import { Module } from '@nestjs/common';

import { AddressModule } from './address/user-address.module';
import { PaymentModule } from './payment/payment.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AddressModule, PaymentModule, UserModule],
})
export class ApiModule {}
