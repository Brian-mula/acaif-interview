import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from 'src/auth/entity/user.entity';
import { CreateCompaignDto } from './dto/create-compaign.dto';
import { SubmitPerformanceDto } from './dto/submit-performance.dto';
import { Compaign } from './entities/compaign.entity';

@Injectable()
export class CompaignsService {
  constructor(
    @InjectModel(Compaign.name) private compaignModel: Model<Compaign>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  // create compaign
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

  // get all compaigns

  async findAllCompains() {
    try {
      const compaigns = await this.compaignModel.find().populate('createdBy').populate('influencers');
      return compaigns;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
// get a signle compaign
  async findOneCompaign(id: string) {
    try {
      return await this.compaignModel.findById(id).populate('createdBy').populate('influencers');
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  // join a compaign
  async joinCompaign(id: string, currentUser:JwtPayload) {
    try {
      const compaign = await this.compaignModel.findById(id);
      if (!compaign) {
        throw new HttpException('Compaign not found', 404);
      }
      const user = await this.userModel.findById(currentUser._id);
      if (!user) {
        throw new HttpException('User not found', 404);
      }
      if (compaign.influencers.includes(user._id)) {
        throw new HttpException('User already joined', 409);
      }
      compaign.influencers.push(user._id);
      await compaign.save();
      return { message: 'User joined compaign successfully' };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  // fetch compaigns a user has joined

  async fetchJoinedCompaigns(userId:string){
    try {
      // find all compaigns where the user is in the influencers array
      const compaigns= await this.compaignModel.find({ influencers: userId }).populate('createdBy').populate('influencers');
      if(!compaigns.length || compaigns.length === 0){
        throw new HttpException('No campaigns found for this influencer', 404);
      }
      return compaigns;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  // submit compaign performance

  async submitCompaignPerformance(compaignId:string,dto:SubmitPerformanceDto,user:JwtPayload){
    try {
      const {totalPosts, likes, shares, comments } = dto;
      const campaign = await this.compaignModel.findById(compaignId);
    if (!campaign) {
      throw new HttpException('Campaign not found', 404);
    }

    

    // Check if influencer has existing performance data
    const existingPerformance = campaign.performance.find(perf =>
      perf.influencer.equals(user._id)
    );

    if (existingPerformance) {
      // Update existing record
      existingPerformance.totalPosts += totalPosts;
      existingPerformance.likes += likes;
      existingPerformance.shares += shares;
      existingPerformance.comments += comments;
      existingPerformance.lastSubmissionDate = new Date();
    } else {
      // Add new record for the influencer
      campaign.performance.push({
        influencer: new Types.ObjectId(user._id),
        totalPosts,
        likes,
        shares,
        comments,
        lastSubmissionDate: new Date(),
      });
    }

    await campaign.save();
    return { message: 'Performance submitted successfully' };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  // get compaign performance metrics

  async getPerformanceMetrics(userId:string){
    try {
      const userObjectId = new Types.ObjectId(userId);

    // Find campaigns where the user is in the performance records
    const campaigns = await this.compaignModel.find(
      { 'performance.influencer': userObjectId },
      { title: 1, performance: 1 }
    );

    if (!campaigns.length) {
      throw new HttpException('No performance data found for this influencer', 404);
    }

    // Filter performance data only for the requested user
    const performanceData = campaigns.map(campaign => {
      const influencerPerformance = campaign.performance.find(perf =>
        perf.influencer.equals(userObjectId)
      );
      return {
        campaignId: campaign._id,
        title: campaign.title,
        totalPosts: influencerPerformance?.totalPosts || 0,
        likes: influencerPerformance?.likes || 0,
        shares: influencerPerformance?.shares || 0,
        comments: influencerPerformance?.comments || 0,
        lastSubmissionDate: influencerPerformance?.lastSubmissionDate,
      };
    });

    return performanceData;
    } catch (error) {
      throw new HttpException(error.message, error.status);
      
    }
  }
 
}
