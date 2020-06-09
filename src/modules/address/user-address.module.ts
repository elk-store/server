import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../../core/auth/auth.module';
import { UserModule } from '../user/user.module';
import { UserAddressController } from './user-address.controller';
import { UserAddress } from './user-address.entity';
import { UserAddressService } from './user-address.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserAddress]),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserAddressController],
  providers: [UserAddressService],
  exports: [UserAddressService],
})
export class UserAddressModule {}
