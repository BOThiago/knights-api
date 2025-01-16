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

@Controller('knights')
export class KnightsController {
  constructor(private readonly knightsService: KnightsService) {}

  @Get()
  async getKnights(@Query('filter') filter: string): Promise<any[]> {
    return this.knightsService.findAll(filter);
  }

  @Get(':id')
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