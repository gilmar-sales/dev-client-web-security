import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import {v4 as uuidV4} from 'uuid';

const ConfigKey = 'config_uuid';

export { ConfigKey };


export function configContextMiddleware(req: Request, res: Response, next: NextFunction) {
  if (!req.cookies[ConfigKey]) {
    const configUuid = uuidV4();
    
    req.cookies[ConfigKey] = configUuid;
    
    res.cookie(ConfigKey, configUuid, {
      sameSite: 'none',
      secure: true,
      httpOnly: true,
      domain: 'app.github.dev'
    });
  }

  next();
}
