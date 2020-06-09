import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user/user.module';
import { AddressContoller } from './address.controller';
import { AddressService } from './address.service';
import { UserAddress } from './user-address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserAddress]), UserModule],
  controllers: [AddressContoller],
  providers: [AddressService],
  exports: [AddressService],
})
export class AddressModule {}
