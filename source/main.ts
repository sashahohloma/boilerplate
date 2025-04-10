import { ClassSerializerInterceptor, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigProvider } from './config/config.provider';
import { ConfigSwagger } from './config/config.swagger';

const bootstrap = async(): Promise<void> => {
    const fastifyAdapter = new FastifyAdapter();

    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        fastifyAdapter,
    );

    const reflector = app.get(Reflector);
    const appConfig = app.get(ConfigProvider);
    const swagger = app.get(ConfigSwagger);

    const serializer = new ClassSerializerInterceptor(reflector, {
        strategy: 'excludeAll',
        excludeExtraneousValues: true,
    });

    const validation = new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    });

    app.enableCors();
    app.enableShutdownHooks();

    app.useGlobalInterceptors(serializer);
    app.useGlobalPipes(validation);

    app.setGlobalPrefix('api');
    app.enableVersioning({
        type: VersioningType.URI,
    });

    if (!appConfig.production) {
        const api = swagger.getAPI();
        const document = SwaggerModule.createDocument(app, api);
        SwaggerModule.setup('docs', app, document);
    }

    await app.listen(appConfig.port, '0.0.0.0');
};

bootstrap();
