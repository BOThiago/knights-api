import { Test, TestingModule } from '@nestjs/testing';
import { KnightsService } from './knights.service';
import { getModelToken } from '@nestjs/mongoose';
import { Knight } from './schemas/knight.schema';

describe('KnightsService', () => {
  let service: KnightsService;

  const mockKnightModel = {
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        KnightsService,
        {
          provide: getModelToken(Knight.name),
          useValue: mockKnightModel,
        },
      ],
    }).compile();

    service = module.get<KnightsService>(KnightsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
