import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CsrfModule } from './csrf/csrf.module';
import { XssModule } from './xss/xss.module';
import { DoSModule } from './dos/dos.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [ThrottlerModule.forRoot([{
    ttl: 60000,
    limit: 10
  }]), CsrfModule, XssModule, DoSModule, ConfigModule,  CacheModule.register()],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {
}
