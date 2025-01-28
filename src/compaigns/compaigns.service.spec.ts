import { Test, TestingModule } from '@nestjs/testing';
import { CompaignsService } from './compaigns.service';

describe('CompaignsService', () => {
  let service: CompaignsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompaignsService],
    }).compile();

    service = module.get<CompaignsService>(CompaignsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
