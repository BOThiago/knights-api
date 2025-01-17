import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { KnightsService } from './knights.service';
import { Knight, KnightSchema } from './schemas/knight.schema';
import { KnightsController } from './knights.controller';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  controllers: [KnightsController],
  imports: [
    MongooseModule.forFeature([{ name: Knight.name, schema: KnightSchema }]),
    CacheModule.register([
      {
        name: 'knights',
        store: 'memory',
        ttl: 60,
      },
    ]),
  ],
  providers: [KnightsService],
  exports: [KnightsService],
})
export class KnightsModule {}
