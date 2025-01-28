import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { RegisterDto } from './dto/register.dto';
import { User } from './entity/user.entity';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
    ) {}

    async register(registerDto:RegisterDto){
        try {
            const {email,password,name} = registerDto;
            const userExist = await this.userModel.findOne({email});
            if(userExist){
                throw new HttpException("User already exist",400);
            }
            const salt = 10;
            const hashedPassword = await bcrypt.hash(password,salt);
            const user = await this.userModel.create({email,password:hashedPassword,name});
            const {password:_,...result} = user.toObject();
            return result;
        } catch (error) {
            throw new HttpException(error.message,error.status);
        }
    }
}
