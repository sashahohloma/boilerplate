import { Injectable } from '@nestjs/common';
import { ConfigProvider } from '../../config/config.provider';
import { IHealthStatus } from './health.types';

@Injectable()
export class HealthService {

    constructor(private readonly config: ConfigProvider) {}

    public getStatus(): IHealthStatus {
        return {
            production: this.config.production,
            timestamp: this.config.now.toISO(),
            timezone: this.config.timezone,
        };
    }

}
