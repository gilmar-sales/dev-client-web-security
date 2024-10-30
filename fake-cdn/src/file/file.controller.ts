import { createReadStream } from 'node:fs';
import { join } from 'node:path';
import {
  Controller,
  Get,
  Param,
  Query,
  Req,
  StreamableFile,
} from '@nestjs/common';
import { Request } from 'express';

@Controller('file')
export class FileController {
  @Get()
  getFile(
    @Req() request: Request,
    @Query('name') name: string,
  ): StreamableFile {
    console.log(request.cookies);

    const file = createReadStream(join(process.cwd(), 'static/' + name));

    const type = name.endsWith('.js') ? 'text/javascript' : 'text/css';

    return new StreamableFile(file, {
      type: type,
      disposition: 'attachment; filename="' + name + '"',
    });
  }
}
