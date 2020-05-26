import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserAddress } from './user-address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserAddress])],
})
export class AddressModule {}
