import { Module } from '@nestjs/common';
import { CompaignsService } from './compaigns.service';
import { CompaignsController } from './compaigns.controller';

@Module({
  controllers: [CompaignsController],
  providers: [CompaignsService],
})
export class CompaignsModule {}
