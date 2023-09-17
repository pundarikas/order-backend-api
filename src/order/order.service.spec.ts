import { Test, TestingModule } from '@nestjs/testing';
import { OrderModule } from './order.module';
import { OrderService } from './order.service';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [OrderModule],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe(`${OrderService.prototype.create.name}`, () => {
    it('should create order based on input', async () => {
      const mockInput = {
        customerId: 1,
        items: [
          {
            itemId: 1,
            quantity: 1,
          },
          {
            itemId: 3,
            quantity: 1,
          },
          {
            itemId: 5,
            quantity: 2,
          },
        ],
      };

      const result = await service.create(mockInput);

      expect(result).toBeDefined();
      expect(result.orderItems.length).toBe(3);
      expect(result.customer.name).toBe('Pundarika Shakya');
      expect(result.orderItems[0].discount).toBe(310);
      expect(result.orderItems[1].discount).toBe(0);
      expect(result.orderItems[2].discount).toBe(2);
    });
  });
});
