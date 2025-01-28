import { Injectable } from '@nestjs/common';
import { CreateCompaignDto } from './dto/create-compaign.dto';
import { UpdateCompaignDto } from './dto/update-compaign.dto';

@Injectable()
export class CompaignsService {
  create(createCompaignDto: CreateCompaignDto) {
    return 'This action adds a new compaign';
  }

  findAll() {
    return `This action returns all compaigns`;
  }

  findOne(id: number) {
    return `This action returns a #${id} compaign`;
  }

  update(id: number, updateCompaignDto: UpdateCompaignDto) {
    return `This action updates a #${id} compaign`;
  }

  remove(id: number) {
    return `This action removes a #${id} compaign`;
  }
}
