import { Inject, Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { Cache, CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';
import { ConfigController } from './config.controller';

@Module({
  imports: [CacheModule.register()],
  providers: [ConfigService],
  controllers: [ConfigController]
})
export class ConfigModule {
}
