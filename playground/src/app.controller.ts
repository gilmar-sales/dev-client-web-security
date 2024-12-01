import { Controller, Get, Render, UseGuards } from '@nestjs/common';

import { AppService } from './app.service';
import { ThrottlerGuard } from '@nestjs/throttler';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  @UseGuards(ThrottlerGuard)
  getIndex() {
    return {};
  }
}
