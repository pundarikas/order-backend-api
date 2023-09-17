import { DataSource } from 'typeorm';
import { Customer } from './customer.entity';
import { CustomerXCategory } from './customer_x_category.entity';

export const CustomerProviders = [
  {
    provide: 'CUSTOMER_REPO',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Customer),
    inject: ['DATA_SOURCE'],
  },
];

export const CustomerCategoryProviders = [
  {
    provide: 'CUSTOMER_X_CATEGORY_REPO',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CustomerXCategory),
    inject: ['DATA_SOURCE'],
  },
];
