import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ThrottlerGuard, ThrottlerLimitDetail, ThrottlerModuleOptions, ThrottlerRequest, ThrottlerStorage } from "@nestjs/throttler";
import { Request } from "express";
import { ConfigService } from "src/config/config.service";
import { ConfigKey } from "src/middlewares/config-context-middleware";

@Injectable()
export class ConfigThrottlerGuard extends ThrottlerGuard {

    constructor(options: ThrottlerModuleOptions, storageService: ThrottlerStorage, reflector: Reflector, private readonly configService: ConfigService) {
        super(options, storageService, reflector);
    }
    async throwThrottlingException(context: ExecutionContext, throttlerLimitDetail: ThrottlerLimitDetail): Promise<void>
    {
        this.configService.setConfig(context.switchToHttp().getRequest().cookies[ConfigKey], {dos: {requestCount: 0}})
        await super.throwThrottlingException(context, throttlerLimitDetail);
    }

    async handleRequest(requestProps: ThrottlerRequest): Promise<boolean> {
        const request = requestProps.context.switchToHttp().getRequest() as Request;

        const config = await this.configService.getConfig(request.cookies[ConfigKey]);

        config.dos.requestCount = (config.dos.requestCount ?? 0) + 1;

        if (!config.dos.rateLimiting)
            return true;

        await this.configService.setConfig(request.cookies[ConfigKey], config);

        return await super.handleRequest(requestProps);
    }
}