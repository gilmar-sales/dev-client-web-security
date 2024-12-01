import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';

interface ConfigContext {
    csrf: {
        secureCookies?: true,
        httpOnlyCookies?: true,
        sameSiteCookies?: true,
        signedCookies?: true
    },
    xss: {
        contentSecurityPolicy?: boolean;
        sanitizeInput?: boolean;
    },
    dos: {
        rateLimiting?: true
    }
}

export type { ConfigContext };

@Injectable()
export class ConfigService {
    
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async getConfig(key: string): Promise<ConfigContext>
  {
    let config = await this.cacheManager.get<ConfigContext>(key);

    if (!config) {
        config = {csrf: {}, xss: {}, dos: {}};

        await this.cacheManager.set(key, config);
    }

    return config
  }
}
