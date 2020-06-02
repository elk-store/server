import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExceptionModule } from './core/exceptions/exception.module';
import { ApiModule } from './modules/api.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(),
    ExceptionModule,
    ApiModule,
  ],
})
export class AppModule {}
