import { TypeormModule } from '@app/database';
import { Module } from '@nestjs/common';
import { CustomerModule } from 'src/customer/customer.module';
import { OrderProviders } from './order.providers';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ItemModule } from 'src/item/item.module';

@Module({
  imports: [TypeormModule, CustomerModule, ItemModule],
  providers: [OrderService, ...OrderProviders],
  controllers: [OrderController],
})
export class OrderModule {}
