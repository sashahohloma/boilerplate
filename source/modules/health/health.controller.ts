import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Version,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { HealthStatusRes } from './health.response';
import { HealthService } from './health.service';

@ApiTags('Health')
@Controller()
export class HealthController {

    constructor(private readonly healthService: HealthService) {}

    @HttpCode(HttpStatus.OK)
    @Version('1')
    @Get('health/liveness')
    public getStatus(): HealthStatusRes {
        const status = this.healthService.getStatus();
        return plainToInstance(HealthStatusRes, status);
    }

}
