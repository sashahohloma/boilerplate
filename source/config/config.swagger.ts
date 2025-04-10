import { Injectable } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';

@Injectable()
export class ConfigSwagger {

    public getAPI(): Omit<OpenAPIObject, 'paths'> {
        return new DocumentBuilder()
            .setTitle('Boilerplate service')
            .setDescription('Build modern backend with NestJS')
            .build();
    }

}
