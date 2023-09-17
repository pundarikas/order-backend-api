import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrderInputDto } from './order.dto';
import { Order } from './order.entity';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async findAll() {
    return this.orderService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: number) {
    return this.orderService.findOne(id);
  }

  @Post()
  async create(@Body() input: OrderInputDto): Promise<Order> {
    return this.orderService.create(input);
  }
}
