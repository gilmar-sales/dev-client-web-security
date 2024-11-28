import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CsrfModule } from './csrf/csrf.module';

@Module({
  imports: [CsrfModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
