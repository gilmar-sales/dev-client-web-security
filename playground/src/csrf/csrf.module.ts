import { Module } from '@nestjs/common';
import { CsrfController } from './csrf.controller';
import { ConfigService } from 'src/config/config.service';
import { ConfigModule } from 'src/config/config.module';

@Module({
  imports: [ConfigModule],
  controllers: [CsrfController]
})
export class CsrfModule {}
