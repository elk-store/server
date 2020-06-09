import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/core/auth/auth.module';

import { UserModule } from '../user/user.module';
import { AddressContoller } from './address.controller';
import { AddressService } from './address.service';
import { UserAddress } from './user-address.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserAddress]),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
  ],
  controllers: [AddressContoller],
  providers: [AddressService],
  exports: [AddressService],
})
export class AddressModule {}
