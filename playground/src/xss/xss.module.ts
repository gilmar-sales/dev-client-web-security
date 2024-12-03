import { Module } from '@nestjs/common';
import { XssController } from './xss.controller';
import { ConfigModule } from 'src/config/config.module';

@Module({
  controllers: [XssController],
  imports: [ConfigModule]
})
export class XssModule {}
