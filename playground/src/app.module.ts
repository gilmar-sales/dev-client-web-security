import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CsrfModule } from './csrf/csrf.module';
import { XssModule } from './xss/xss.module';
import { DoSModule } from './dos/dos.module';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [ThrottlerModule.forRoot([{
    ttl: 60000,
    limit: 10
  }]), CsrfModule, XssModule, DoSModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
