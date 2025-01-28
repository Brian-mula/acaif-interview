import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/entity/user.entity';
import { CreateCompaignDto } from './dto/create-compaign.dto';
import { UpdateCompaignDto } from './dto/update-compaign.dto';
import { Compaign } from './entities/compaign.entity';

@Injectable()
export class CompaignsService {
  constructor(
    @InjectModel(Compaign.name) private compaignModel: Model<Compaign>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}
  async createCompaign(createCompaignDto: CreateCompaignDto) {
   try {
      const { title, description, deadline, createdBy, influencers, totalPosts } = createCompaignDto;
      const isUserExist = await this.userModel.findById(createdBy);
      if (!isUserExist) {
        throw new HttpException('User not found', 404);
      }
      const isCompaignExist = await this.compaignModel.findOne({ title });
      if (isCompaignExist) {
        throw new HttpException('Compaign already exist', 409);
      }
      const compaign = new this.compaignModel(createCompaignDto);
      await compaign.save();
      return compaign;
   } catch (error) {
    throw new HttpException(error.message, error.status);
   }
  }

  async findAllCompains() {
    try {
      const compaigns = await this.compaignModel.find().populate('createdBy').populate('influencers');
      return compaigns;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOneCompaign(id: string) {
    try {
      return await this.compaignModel.findById(id).populate('createdBy').populate('influencers');
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  update(id: number, updateCompaignDto: UpdateCompaignDto) {
    return `This action updates a #${id} compaign`;
  }

  remove(id: number) {
    return `This action removes a #${id} compaign`;
  }
}
