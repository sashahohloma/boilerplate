import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Query,
    Version,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { DemoReq } from './demo.request';
import { DemoRes } from './demo.response';
import { DemoService } from './demo.service';

@ApiTags('Demo')
@Controller()
export class DemoController {

    constructor(private readonly demoService: DemoService) {}

    @ApiOperation({
        summary: 'Convert name from request to greeting message',
    })
    @HttpCode(HttpStatus.OK)
    @Version('1')
    @Get('demo/message')
    public getStatus(@Query() query: DemoReq): DemoRes {
        const message = this.demoService.getMessage(query);
        return plainToInstance(DemoRes, message);
    }

}
