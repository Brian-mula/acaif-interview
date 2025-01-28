import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompaignsService } from './compaigns.service';
import { CreateCompaignDto } from './dto/create-compaign.dto';
import { UpdateCompaignDto } from './dto/update-compaign.dto';

@Controller('compaigns')
export class CompaignsController {
  constructor(private readonly compaignsService: CompaignsService) {}

  @Post()
  create(@Body() createCompaignDto: CreateCompaignDto) {
    return this.compaignsService.create(createCompaignDto);
  }

  @Get()
  findAll() {
    return this.compaignsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.compaignsService.findOne(+id);
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
