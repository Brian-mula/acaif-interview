import { IsNotEmpty, IsNumber } from "class-validator";

export class SubmitPerformanceDto {    
    @IsNumber()
    @IsNotEmpty()
    totalPosts: number;
  
    @IsNumber()
    @IsNotEmpty()
    likes: number;
  
    @IsNumber()
    @IsNotEmpty()
    shares: number;
  
    @IsNumber()
    @IsNotEmpty()
    comments: number;
  }