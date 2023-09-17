import { TypeormModule } from 'libs/database/src';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { CustomerModule } from './customer/customer.module';
import { ItemModule } from './item/item.module';
import { OrderModule } from './order/order.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    CategoryModule,
    CustomerModule,
    TypeormModule,
    ItemModule,
    OrderModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
