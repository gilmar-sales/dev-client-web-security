import { Controller, Get, Render} from '@nestjs/common';

@Controller('xss')
export class XssController {
  @Get('index')
  @Render('xss/index')
  getLogin() {
    return { message: 'Hello world!' };
  }
}
