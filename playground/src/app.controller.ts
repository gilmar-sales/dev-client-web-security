import { Controller, Get, Render, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ConfigService } from './config/config.service';
import { Request } from 'express';
import { ConfigKey } from './middlewares/config-context-middleware';
import { spawnSync } from "child_process";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly configService: ConfigService) { }

  @Get()
  @Render('index')
  @UseGuards(ThrottlerGuard)
  async getIndex(@Req() request: Request) {
    const config = await this.configService.getConfig(request.cookies[ConfigKey])

    return config;
  }
}
