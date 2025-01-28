import { Test, TestingModule } from '@nestjs/testing';
import { CompaignsController } from './compaigns.controller';
import { CompaignsService } from './compaigns.service';

describe('CompaignsController', () => {
  let controller: CompaignsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaignsController],
      providers: [CompaignsService],
    }).compile();

    controller = module.get<CompaignsController>(CompaignsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
