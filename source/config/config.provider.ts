import { Inject, Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { ConfigToken } from './config.tokens';
import { IConfig } from './config.types';

@Injectable()
export class ConfigProvider {

    public readonly name: string;
    public readonly port: number;
    public readonly production: boolean;
    public readonly timezone: string;

    constructor(@Inject(ConfigToken) env: IConfig) {
        this.name = env.get('APP_NAME').required().asString();
        this.port = env.get('APP_PORT').required().asPortNumber();
        this.production = env.get('APP_PRODUCTION').required().asBoolStrict();
        this.timezone = env.get('APP_TIMEZONE').required().asString();
    }

    public get now(): DateTime {
        return DateTime.local({ zone: this.timezone });
    }

}
