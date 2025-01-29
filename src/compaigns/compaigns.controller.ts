import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user-decorator';
import { CompaignsService } from './compaigns.service';
import { CreateCompaignDto } from './dto/create-compaign.dto';
import { SubmitPerformanceDto } from './dto/submit-performance.dto';

@UseGuards(JwtAuthGuard)
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
  async joinCompaign(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.compaignsService.joinCompaign(id, user);
  }

  @Get('joined/:userId')
  async getJoinedCompaigns(@Param('userId') userId: string) {
    return await this.compaignsService.fetchJoinedCompaigns(userId);
  }

  @Patch('submit-performance/:compaignId')
  async submitPerformance(
    @Param('compaignId') compaignId: string,
    @Body() submitPerformanceDto: SubmitPerformanceDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.compaignsService.submitCompaignPerformance(compaignId, submitPerformanceDto, user);
  }

  @Get('performance/:userId')
  async getPerformance(@Param('userId') userId: string) {
    return this.compaignsService.getPerformanceMetrics(userId);
  }
}
