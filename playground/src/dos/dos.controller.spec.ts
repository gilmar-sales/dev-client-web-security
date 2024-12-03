import { Test, TestingModule } from '@nestjs/testing';
import { DosController } from './dos.controller';

describe('DosController', () => {
  let controller: DosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DosController],
    }).compile();

    controller = module.get<DosController>(DosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
