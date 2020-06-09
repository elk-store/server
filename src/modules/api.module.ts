import { Module } from '@nestjs/common';

import { AddressModule } from './address/user-address.module';
import { PaymentModule } from './payment/payment.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AddressModule, PaymentModule, UserModule, ProductModule],
})
export class ApiModule {}
