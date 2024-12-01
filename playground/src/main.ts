import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as cookieParser from 'cookie-parser';
import * as hbs from 'hbs';

import { AppModule } from './app.module';
import { configContextMiddleware } from './middlewares/config-context-middleware';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );
  
  app.useStaticAssets(join(__dirname, '..', 'public'));

  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  hbs.registerPartials(join(__dirname, '..', 'views/partials'));
  
  app.setViewEngine('hbs');
  
  app.use(cookieParser("2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b"));
  app.use(configContextMiddleware);
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
