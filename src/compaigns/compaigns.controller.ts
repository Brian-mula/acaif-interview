import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CompaignsService } from './compaigns.service';
import { CreateCompaignDto } from './dto/create-compaign.dto';
import { UpdateCompaignDto } from './dto/update-compaign.dto';

@Controller('compaigns')
export class CompaignsController {
  constructor(private readonly compaignsService: CompaignsService) {}

  @Post('create')
  async createCompaign(@Body() createCompaignDto: CreateCompaignDto) {
    return this.compaignsService.createCompaign(createCompaignDto);
  }

  @Get()
  findAllCompains() {
    return this.compaignsService.findAllCompains();
  }

  @Get(':id')
  async findOneCompaign(@Param('id') id: string) {
    return this.compaignsService.findOneCompaign(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompaignDto: UpdateCompaignDto) {
    return this.compaignsService.update(+id, updateCompaignDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.compaignsService.remove(+id);
  }
}
