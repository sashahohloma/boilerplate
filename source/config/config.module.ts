import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { DynamicModule, FactoryProvider } from '@nestjs/common';
import { parse } from 'dotenv';
import { Extensions, from } from 'env-var';
import { ConfigProvider } from './config.provider';
import { ConfigSwagger } from './config.swagger';
import { ConfigToken } from './config.tokens';
import { IConfigParams } from './config.types';

export class ConfigModule {

    public static forRoot<TSchema extends object>(props?: IConfigParams): DynamicModule {
        const envProvider: FactoryProvider = {
            provide: ConfigToken,
            useFactory: async(): Promise<unknown> => {
                const env = process.env as TSchema;

                const root = process.cwd();
                const path = props?.path ?? resolve(root, '.env');

                const isExists = existsSync(path);
                if (isExists) {
                    const raw = await readFile(path, 'utf8');
                    const dotenv = parse(raw);

                    Object.assign(env, dotenv);
                }

                return from<TSchema, Extensions>(env);
            },
        };
        return {
            global: true,
            module: ConfigModule,
            providers: [
                envProvider,
                ConfigProvider,
                ConfigSwagger,
            ],
            exports: [
                ConfigProvider,
                ConfigSwagger,
            ],
        };
    }

}
