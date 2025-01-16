import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnightsController } from './knights/knights.controller';
import { KnightsModule } from './knights/knights.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
        // Caso necessário autenticação
        // auth: {
        //   username: configService.get('DATABASE_USER'),
        //   password: configService.get('DATABASE_PASS'),
        // },
      }),
      inject: [ConfigService],
    }),
    KnightsModule,
  ],
  controllers: [AppController, KnightsController],
  providers: [AppService],
})
export class AppModule {}
