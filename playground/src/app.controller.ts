import { Body, Controller, Get, Post, Render, Req, Res } from '@nestjs/common';
import { Response, Request, CookieOptions } from 'express';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getIndex(@Req() request: Request, @Res() response: Response) {

    return {  };
  }
}
