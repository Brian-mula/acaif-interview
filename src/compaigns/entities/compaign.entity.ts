import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { User } from "src/auth/entity/user.entity";

@Schema({ timestamps: true })
export class Compaign {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true,type:Date })
    deadline: Date;

    @Prop({type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]})
    influencers: Types.ObjectId[];

    @Prop({type:mongoose.Schema.Types.ObjectId, ref: 'User' })
    createdBy: User;

    @Prop({ default: true,type:Boolean })
    isActive: boolean;

    @Prop({default:0,type:Number})
    totalPosts: number;
    
    @Prop({
        type: [
          {
            influencer: { type: Types.ObjectId, ref: 'User' },
            totalPosts: Number,
            likes: Number,
            shares: Number,
            comments: Number,
            lastSubmissionDate: Date,
          },
        ],
        default: [],
      })
      performance: {
        influencer: Types.ObjectId;
        totalPosts: number;
        likes: number;
        shares: number;
        comments: number;
        lastSubmissionDate: Date;
      }[];
}

export const CompaignSchema = SchemaFactory.createForClass(Compaign);
