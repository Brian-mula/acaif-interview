import { PartialType } from '@nestjs/mapped-types';
import { CreateCompaignDto } from './create-compaign.dto';

export class UpdateCompaignDto extends PartialType(CreateCompaignDto) {}
