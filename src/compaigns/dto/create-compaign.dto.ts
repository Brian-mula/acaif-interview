import { Type } from "class-transformer";
import { IsArray, IsDate, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCompaignDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    deadline: Date;

    @IsMongoId()
    @IsNotEmpty()
    createdBy: string;

    @IsArray()
    @IsOptional()
    @IsMongoId({ each: true })
    influencers?: string[];

    @IsOptional()
    @IsNumber()
    totalPosts?: number;
}
