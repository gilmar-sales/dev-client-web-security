import { Body, Controller, Get, Post, Render, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express'

import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  getIndex(@Req() request: Request) {
    return { login: request.cookies.login };
  }

  @Get('login')
  @Render('login')
  getLogin() {
    return { message: 'Hello world!' };
  }

  @Post('login')
  login(@Body() credencial: { username: string, password: string }, @Res() response: Response) {
    if (credencial.username === 'admin' &&
      credencial.password === 'admin'
    ) {
      return response.cookie('token', 'imagine um token importante aqui').cookie('login', credencial.username).redirect('/');
    }

    return response.status(401).send();
  }

}
