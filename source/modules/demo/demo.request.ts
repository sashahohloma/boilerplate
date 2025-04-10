import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IDemoRequest } from './demo.types';

export class DemoReq implements IDemoRequest {

    @ApiProperty({ example: 'John' })
    @IsString()
    @IsNotEmpty()
    public name: string;

}
