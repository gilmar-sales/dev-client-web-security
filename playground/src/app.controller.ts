import { Controller, Get, Render, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ConfigService } from './config/config.service';
import { Request } from 'express';
import { ConfigKey } from './middlewares/config-context-middleware';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly configService: ConfigService) { }

  @Get()
  @Render('index')
  @UseGuards(ThrottlerGuard)
  getIndex(@Req() request: Request) {
    const config = this.configService.getConfig(request.cookies[ConfigKey])

    return config;
  }
}
