import { Cache, CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';
import { Controller, Get, Inject, Post, Render, Req, Res} from '@nestjs/common';
import { Request, Response } from 'express';
import { ConfigService } from 'src/config/config.service';
import { ConfigKey } from 'src/middlewares/config-context-middleware';
import * as he from 'he'

interface Rating {
  message: string;
}

@Controller('xss')
export class XssController {

  constructor(private readonly configService: ConfigService, @Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  @Get()
  @Render('xss/index')
  async getIndex(@Req() request: Request) {
    const config = await this.configService.getConfig(request.cookies[ConfigKey])
    let ratings = await this.cacheManager.get<Rating[]>('ratings') ?? [];

    if (config.xss.sanitizeInput)
      ratings = ratings.map(rating => ({message: he.encode(rating.message)}));

    return {...config, ratings};
  }

  @Post()
  async setConfig(@Req() request: Request, @Res() response: Response) {
    if (!request.cookies[ConfigKey] && !request.signedCookies[ConfigKey])
      return response.status(500).send();
    
    await this.configService.setConfig(request.cookies[ConfigKey], {
      xss: {
        contentSecurityPolicy: !!request.body.contentSecurityPolicy,
        sanitizeInput: !!request.body.sanitizeInput
      }
    });

    return response.redirect('/xss');
  }

  
  @Post('add-rating')
  async addRating(@Req() request: Request, @Res() response: Response) {
    const ratings = await this.cacheManager.get<Rating[]>('ratings') ?? [];

    ratings.push({message: request.body.ratingMessage});

    await this.cacheManager.set('ratings', ratings);

    return response.redirect('/xss');
  }
}
