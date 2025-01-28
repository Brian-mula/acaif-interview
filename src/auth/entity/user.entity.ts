import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Compaign } from "src/compaigns/entities/compaign.entity";

@Schema({ timestamps: true })
export class User{
    @Prop({ required: true,unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    name: string;

    @Prop({ default: "influencer",enum: ["influencer","brand"] })
    role: string;

    @Prop({ type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Compaign' }] })
    compaigns: Compaign[];
}

export const UserSchema = SchemaFactory.createForClass(User);