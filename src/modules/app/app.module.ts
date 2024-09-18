import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../../config/index';
import { SystemUserModule } from '../system/user/systemUser.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      cache: true,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ...config.get('db.mysql'),
        entities: [`${__dirname}/**/*.entity{.ts,.js}`],
        autoLoadEntities: true,
      }),
    }),
    SystemUserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
