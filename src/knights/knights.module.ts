import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { KnightsService } from './knights.service';
import { Knight, KnightSchema } from './schemas/knight.schema';
import { KnightsController } from './knights.controller';

@Module({
  controllers: [KnightsController],
  imports: [
    MongooseModule.forFeature([{ name: Knight.name, schema: KnightSchema }]),
  ],
  providers: [KnightsService],
  exports: [KnightsService],
})
export class KnightsModule {}
