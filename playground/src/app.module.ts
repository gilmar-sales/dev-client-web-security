import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CsrfModule } from './csrf/csrf.module';
import { XssModule } from './xss/xss.module';

@Module({
  imports: [CsrfModule, ThrottlerModule.forRoot([{
    ttl: 60000,
    limit: 10
  }]), XssModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
