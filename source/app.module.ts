import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { DemoModule } from './modules/demo/demo.module';
import { HealthModule } from './modules/health/health.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        HealthModule,
        DemoModule,
    ],
})
export class AppModule {}
