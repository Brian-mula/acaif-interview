import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/auth/entity/user.entity';
import { CompaignsController } from './compaigns.controller';
import { CompaignsService } from './compaigns.service';
import { Compaign, CompaignSchema } from './entities/compaign.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Compaign.name, schema: CompaignSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [CompaignsController],
  providers: [CompaignsService],
})
export class CompaignsModule {}
