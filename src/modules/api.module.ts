import { Module } from '@nestjs/common';

import { UserAddressModule } from './address/user-address.module';
import { PaymentModule } from './payment/user-payment.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserAddressModule, PaymentModule, ProductModule, UserModule],
})
export class ApiModule {}
