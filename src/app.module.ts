import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnightsController } from './knights/knights.controller';
import { KnightsModule } from './knights/knights.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import { RedisOptions } from './config/app-options.constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb://${configService.get('DATABASE_HOST')}:${configService.get('DATABASE_PORT')}`,
        dbName: `${configService.get('DATABASE_NAME')}`,
        autoCreate: true,
        auth: {
          username: configService.get('DATABASE_USER'),
          password: configService.get('DATABASE_PASS'),
        },
      }),
      inject: [ConfigService],
    }),
    CacheModule.registerAsync(RedisOptions),
    KnightsModule,
  ],
  controllers: [AppController, KnightsController],
  providers: [AppService],
})
export class AppModule {}
