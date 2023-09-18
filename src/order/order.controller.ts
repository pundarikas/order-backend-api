import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { FindOrderDto, OrderCreateDto } from './order.dto';
import { Order } from './order.entity';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async findAll(@Query() query: FindOrderDto) {
    return this.orderService.findOrders(query);
  }

  @Get('/:id')
  async findOne(@Param('id') id: number) {
    return this.orderService.findOne(id);
  }

  @Post()
  async create(@Body() input: OrderCreateDto): Promise<Order> {
    return this.orderService.create(input);
  }
}
