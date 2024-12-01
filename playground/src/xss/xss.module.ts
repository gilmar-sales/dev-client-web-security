import { Module } from '@nestjs/common';
import { XssController } from './xss.controller';

@Module({
  controllers: [XssController]
})
export class XssModule {}
