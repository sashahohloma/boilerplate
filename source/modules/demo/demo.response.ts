import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IDemoResponse } from './demo.types';

export class DemoRes implements IDemoResponse {

    @ApiProperty({ example: '9a0f14da-c8a9-4492-a261-10e098d191c2' })
    @Expose()
    public id: string;

    @ApiProperty({ example: 'Hello, John' })
    @Expose()
    public message: string;

    @ApiProperty({ example: '1993-07-23T13:50:49.698Z' })
    @Expose()
    public timestamp: string;

}
