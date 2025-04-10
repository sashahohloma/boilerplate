import { Injectable } from '@nestjs/common';
import { capitalize } from 'radash';
import { v5 as UUIDv5 } from 'uuid';
import { ConfigProvider } from '../../config/config.provider';
import { IDemoRequest, IDemoResponse } from './demo.types';

@Injectable()
export class DemoService {

    constructor(private readonly config: ConfigProvider) {}

    public getMessage(params: IDemoRequest): IDemoResponse {
        const lower = params.name.toLowerCase();
        const name = capitalize(lower);
        return {
            id: UUIDv5(lower, UUIDv5.URL),
            message: `Hello, ${name}`,
            timestamp: this.config.now.toISO(),
        };
    }

}
