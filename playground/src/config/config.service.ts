import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';

interface ConfigContext {
    csrf?: {
        secureCookies?: boolean,
        httpOnlyCookies?: boolean,
        sameSiteCookies?: boolean,
        signedCookies?: boolean
    },
    xss?: {
        contentSecurityPolicy?: boolean;
        sanitizeInput?: boolean;
    },
    dos?: {
        rateLimiting?: boolean
        requestCount?: number
    }
}

export type { ConfigContext };

@Injectable()
export class ConfigService {
    
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async getConfig(key: string): Promise<ConfigContext>
  {
    try
    {
        let config = await this.cacheManager.get<ConfigContext>(key);

        if (!config)
            throw new Error('')

        return config
    }
    catch(e)
    {
        const config = {csrf: {}, xss: {}, dos: {}};

        await this.cacheManager.set(key, config);

        return config
    }
  }

  async setConfig(key: string, context: ConfigContext)
    {
        let config = await this.getConfig(key);

        Object.keys(context).forEach(objKey => Object.assign(config[objKey], context[objKey]))

        await this.cacheManager.set(key, config);
    }
}
