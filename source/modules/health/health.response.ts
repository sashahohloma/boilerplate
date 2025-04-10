import { Expose } from 'class-transformer';
import { IHealthStatus } from './health.types';

export class HealthStatusRes implements IHealthStatus {

    @Expose()
    public production: boolean;

    @Expose()
    public timestamp: string;

    @Expose()
    public timezone: string;

}
