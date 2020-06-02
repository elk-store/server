import { ConfigModule } from '@nestjs/config';

export const ConfigModuleTest = ConfigModule.forRoot({ isGlobal: true });
