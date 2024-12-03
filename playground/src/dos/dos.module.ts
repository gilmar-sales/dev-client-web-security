import { Module } from '@nestjs/common';
import { DosController } from './dos.controller';
import { ConfigModule } from 'src/config/config.module';

@Module({
    imports: [ConfigModule],
  controllers: [DosController]
})
export class DoSModule {}
