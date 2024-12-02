import { Inject, Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigController } from './config.controller';

@Module({
  providers: [ConfigService],
  exports: [ConfigService],
  controllers: [ConfigController]
})
export class ConfigModule {
}
