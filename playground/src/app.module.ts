import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CsrfModule } from './csrf/csrf.module';
import { XssModule } from './xss/xss.module';
import { DoSModule } from './dos/dos.module';
import { ConfigModule } from './config/config.module';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigContextMiddleware } from './middlewares/config-context-middleware';

@Module({
  imports: [CacheModule.register({ isGlobal: true, ttl: 2147483646 }), ThrottlerModule.forRoot([{
    ttl: 6000,
    limit: 3
  }]), CsrfModule, XssModule, DoSModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ConfigContextMiddleware)
      .forRoutes('*');
  }
}
