import { Test, TestingModule } from '@nestjs/testing';
import { DniService } from './dni.service';

describe('DniService', () => {
  let service: DniService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DniService],
    }).compile();

    service = module.get<DniService>(DniService);
  });

  it('should return the correct full name', async () => {
    const result = await service.getDni('16302511');
    expect(result).toBe('CIPRIANO ALARCON SUYO');
  });
});
