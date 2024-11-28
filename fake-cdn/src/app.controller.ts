import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response, response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('prize')
  getFile(@Req() request: Request, @Res() response: Response) {
    console.log(request.cookies);

    return response.redirect('https://supreme-meme-7j6v5x4qqr3w69g-3000.app.github.dev/')
  }
}
