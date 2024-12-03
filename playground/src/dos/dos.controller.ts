import { Controller, Get, Post, Render, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { ConfigService } from 'src/config/config.service';
import { ConfigThrottlerGuard } from 'src/guards/ConfigThrottlerGuard';
import { ConfigKey } from 'src/middlewares/config-context-middleware';

@Controller('dos')
export class DosController {
    constructor(private readonly configService: ConfigService) {}

    @Get()
    @Render('dos/index')
    @UseGuards(ConfigThrottlerGuard)
    async getIndex(@Req() request: Request)
    {
        const config = await this.configService.getConfig(request.cookies[ConfigKey] ?? request.cookies[ConfigKey]);

        return {...config.dos}
    }

    @Post()
    async setConfig(@Req() request: Request, @Res() response: Response) {
      if (!request.cookies[ConfigKey] && !request.signedCookies[ConfigKey])
        return response.status(500);
      
      await this.configService.setConfig(request.cookies[ConfigKey], {
        dos: {
          rateLimiting: !!request.body.rateLimiting
        }
      });
  
      return response.redirect('/dos');
    }
}
