import { TypeormModule } from 'libs/database/src';
import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import {
  CustomerCategoryProviders,
  CustomerProviders,
} from './customer.providers';

@Module({
  imports: [TypeormModule],
  providers: [
    CustomerService,
    ...CustomerProviders,
    ...CustomerCategoryProviders,
  ],
  exports: [CustomerService],
})
export class CustomerModule {}
