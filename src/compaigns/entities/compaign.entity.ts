import { Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class Compaign {}

export const CompaignSchema = SchemaFactory.createForClass(Compaign);
