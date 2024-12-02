import { Body, Controller, Get, Post, Render, Req, Res } from '@nestjs/common';
import { Response, Request, CookieOptions } from 'express';
import { ConfigService } from 'src/config/config.service';
import { ConfigKey } from 'src/middlewares/config-context-middleware';

@Controller('csrf')
export class CsrfController {

  constructor(private readonly configService: ConfigService) {}

  @Get()
  @Render('csrf/home')
  getIndex(@Req() request: Request, @Res() response: Response) {
    if (!request.cookies.token && !request.signedCookies.token)
      return response.redirect('/csrf/login');

    return { ...request.signedCookies, ...request.cookies };
  }

  @Post()
  async setConfig(@Req() request: Request, @Res() response: Response) {
    if (!request.cookies[ConfigKey] && !request.signedCookies[ConfigKey])
      return response.status(500);
    
    await this.configService.setConfig(request.cookies[ConfigKey], {
      csrf: {
        signedCookies: !!request.body.signedCookies,
        httpOnlyCookies: !!request.body.httpOnlyCookies,
        sameSiteCookies: !!request.body.sameSiteCookies,
        secureCookies: !!request.body.secureCookies
      }
    });

    return response.redirect('/csrf');
  }

  @Get('login')
  @Render('csrf/login')
  getLogin() {
    return { message: 'Hello world!' };
  }

  @Post('login')
  login(
    @Body() credencial: { username: string; password: string },
    @Res() response: Response,
  ) {
    if (!credencial.username || !credencial.password)
      return response.status(401).send();

    const cookieOptions: CookieOptions = {
      sameSite: 'strict',
      secure: true,
      httpOnly: true,
      signed: true
    }

    return response
      .cookie('token', 'imagine um token importante aqui', cookieOptions)
      .cookie('username', credencial.username, cookieOptions)
      .cookie('password', credencial.username, cookieOptions)
      .redirect('/csrf');
  }

  @Post('/logout')
  logout(
    @Res() response: Response,
  ) {
    return response
      .clearCookie('token')
      .clearCookie('username')
      .clearCookie('password')
      .redirect('/csrf/login');
  }
}
