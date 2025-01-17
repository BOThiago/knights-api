import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { KnightsService } from './knights.service';
import { Knight } from './schemas/knight.schema';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ApiTags } from '@nestjs/swagger';

@Controller('knights')
@ApiTags('Knights')
export class KnightsController {
  constructor(private readonly knightsService: KnightsService) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  async getKnights(@Query('filter') filter: string): Promise<any[]> {
    return this.knightsService.findAll(filter);
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  async getKnight(@Param('id') id: string): Promise<any> {
    return this.knightsService.findOne(id);
  }

  @Post()
  async createKnight(@Body() knightData: Knight): Promise<Knight> {
    return this.knightsService.createKnight(knightData);
  }

  @Patch(':id')
  async updateNickname(
    @Param('id') id: string,
    @Body('nickname') nickname: string,
  ): Promise<Knight> {
    return this.knightsService.updateNickname(id, nickname);
  }

  @Delete(':id')
  async deleteKnight(@Param('id') id: string): Promise<void> {
    return this.knightsService.remove(id);
  }
}
