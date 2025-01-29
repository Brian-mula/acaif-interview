import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from './entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    try {
      const { email, password, name } = registerDto;
      const userExist = await this.userModel.findOne({ email });
      if (userExist) {
        throw new HttpException('User already exist', 400);
      }
      const salt = 10;
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await this.userModel.create({
        email,
        password: hashedPassword,
        name,
      });
      const { password: _, ...result } = user.toObject();
      return result;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const { email, password } = loginDto;
      const userExist = await this.userModel.findOne({ email });
      if (!userExist) {
        throw new HttpException('Wrong credentials', 400);
      }
      const isMatch = await bcrypt.compare(password, userExist.password);
      if (!isMatch) {
        throw new HttpException('Wrong credentials', 400);
      }
      const payload = {_id: userExist._id, role: userExist.role};
      const token = await this.jwtService.signAsync(payload);
        return { token };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
